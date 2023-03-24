const { KpopNews } = require('../../../models')

class KpopNewsGetController {

    getKpopNews = async (req, res, next) => {
        try {
            const allKpopNews = await KpopNews.findAll({})
            res.status(200).json({ allKpopNews })
    
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error })
            
        }
    }
}

module.exports = KpopNewsGetController;