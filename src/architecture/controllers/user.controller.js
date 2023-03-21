const { User, LikeVideo } = require('../../models')

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
            res.status(200).json({ message: 'Like video saved successfully'});
        } catch (error) {
            res.status(400).json({ message: error })
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
            res.status(400).json({ message: error })
            next(error);
        }
    }

    deleteLikeVideo = async (req, res, next) => {
        try {
            const { videoId } = req.body;
            const userId = req.user.userId
            console.log("deleteLikeVideo-----userId------------",userId)
            await LikeVideo.destroy({ where: { userId, videoId } });
            res.status(200).json({ message: 'Like video deleted successfully'});
        } catch (error) {
            res.status(400).json({ message: error })
            next(error);
        }
    };
    
    getLikeVideos = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const allLikeVideos = await User.findOne({
                where: { userId },
                attributes: ['userId'], // 사용자 ID 만 가져옵니다.
                include: [{             
                    model: LikeVideo,
                    attributes: ['videoId'],
                    where: { userId }, // userId에 따른 LikeVideo 만 가져옵니다.
                    // limit: 3
                }],                                
            });
            const videoIds = allLikeVideos.LikeVideos.map(likeVideo => likeVideo.videoId); // map 공부하기..
            res.status(200).json({ videoId: videoIds });
        } catch(error) {
            res.status(400).json({ message: error });
            next(error);
        }
    }
    


}


module.exports = UserController;