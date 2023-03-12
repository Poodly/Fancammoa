const GetVideoInfoService = require('../../services/search.video.service/search.video.info.service');
require("dotenv").config();

class GetVideoInfoController {
    getVideoInfoService = new GetVideoInfoService();

    getVideoInfo = async (req, res, next) => {
        try {
            const { videoId } = req.body
            const APIKEY = process.env.YOUTUBE_APIKEY3;
            const VIDEOURL = process.env.VIDEOURL;
            const data = await this.getVideoInfoService.getVideoInfo(videoId, APIKEY, VIDEOURL);
            res.status(200).json(data);
        } catch (error){
            console.error(error);
            next(error); 
        };
    };
}

module.exports = GetVideoInfoController;

// APIKEY, VIDEOURL 같은 코드를 전역변수로 두지 말라고 하시는군!
// 전역변수가아니라 함수안에 넣으라는거구나
// 네, 맞습니다. getVideoInfo 메서드에서 API 키와 비디오 URL을 매개변수로 전달받도록 수정하면 됩니다. 이렇게 수정하면, 
// GetVideoInfoController에서 환경 변수를 직접 사용하는 것이 아니라, getVideoInfo 메서드를 호출할 때 인자로 전달하여 사용할 수 있게 됩니다. 
// 이렇게 하면 코드 유지보수성이 향상되며, 더 나은 확장성을 가질 수 있습니다.
// 전역변수로두면 안되는이유가 있어?
// 전역 변수는 프로그램의 모든 곳에서 접근 가능하기 때문에 코드의 예측 불가능성과 유지보수성이 떨어질 수 있습니다. 예를 들어, 
// 전역 변수에 다른 값을 할당하는 다른 함수가 있다면 예기치 않게 전역 변수 값이 변경될 수 있습니다.

// 또한, 전역 변수가 코드 양이 증가하고 복잡도가 높아질수록 프로그램의 동작을 이해하거나 수정하기가 어려워집니다.

// 그래서 전역 변수를 사용하는 대신에, 함수나 객체 내에 변수를 지역 변수로 선언하는 것이 좋습니다. 이렇게 하면 변수가 해당 함수 또는 객체에서만 접근 가능하기 때문에 
// 코드 예측 가능성과 유지보수성이 향상됩니다.
