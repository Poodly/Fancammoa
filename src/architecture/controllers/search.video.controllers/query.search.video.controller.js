const QuerySearchVideoService = require('../../services/search.video.services/query.search.video.service');
require("dotenv").config();

class QuerySearchVideoController {
    QuerySearchVideoService = new QuerySearchVideoService();

    querySearchVideo = async (req, res, next) => {
        try {
            const query = req.body.query;
            const APIKEY = process.env.YOUTUBE_APIKEY;
            const SEARCHURL = process.env.SEARCHURL;
            const videoIds = await this.QuerySearchVideoService.querySearchVideo(query, APIKEY, SEARCHURL);
            res.status(200).json(videoIds);
        } 
        catch (error) {
            console.error(error);
            next(error);
        }
    };
}

module.exports = QuerySearchVideoController;