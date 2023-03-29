const StartSearchVideoService = require('../../services/search.video.services/start.search.video.service');
require("dotenv").config();

class StartSearchVideoController {
    startSearchVideoService = new StartSearchVideoService();

    startSearchVideo = async (req, res, next) => {
        try {
            const APIKEY = process.env.YOUTUBE_APIKEY;
            const SEARCHURL = process.env.SEARCHURL;
            const videoIds = await this.startSearchVideoService.startSearchVideo(APIKEY, SEARCHURL);
            res.status(200).json(videoIds);
        } 
        catch (error) {
            console.error(error);
            next(error);
        }
    };
}

module.exports = StartSearchVideoController;