
// fan_cam
exports.renderMain = (req, res, next) => {
    try {
        res.render('main');
        
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
        return next(error);
    };
};