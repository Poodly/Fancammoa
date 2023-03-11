const { LikeVideo } = require('../models')

class UserController {
    // 로그인한 유저의 userId, 비디오 id 저장
    // 모달창을 킬떄마다 db에 이 비디오 id가 저장되어있는지 여부를 체크
    // 저장되어있다면 하트를 빨간색으로 아니라면 빈 하트로..
    saveLikeVideo = async (req, res, next) => {
        try {
            const { videoId } = req.body;
            const userId = req.user.userId
            console.log("saveLikeVideo-----userId------------",userId)
            await LikeVideo.create({ userId, videoId });
            res.status(200).send('Like video saved successfully');
        } catch (error) {
            console.log("좋아요 저장 에러")
            next(error);
        }
    }

    existLikevideo = async (req, res, next) => {
        try {
            const { videoId } = req.body;
            const userId = req.user.userId
            console.log("existLikevideo-----userId------------",userId)
            const existLikevideo = await LikeVideo.findOne({ where: { userId, videoId } });
            res.status(200).json({ data: existLikevideo });
        } catch (error) {
            console.log("좋아요 체크 실패")
            next(error);
        }
    }

    deleteLikeVideo = async (req, res, next) => {
        try {
            const { videoId } = req.body;
            const userId = req.user.userId
            console.log("deleteLikeVideo-----userId------------",userId)
            await LikeVideo.destroy({ where: { userId, videoId } });
            res.status(200).send('Like video deleted successfully');
        } catch (error) {
            console.log("좋아요 삭제 에러")
            next(error);
        }
    };
    

}


module.exports = UserController;