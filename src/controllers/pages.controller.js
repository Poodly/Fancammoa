class Render {
    // Main page
    main = (req, res, next) => {
        try {
            res.render('main');
            
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
            return next(error);
        };
    };
    
    // Login page
    login = (req, res, next) => {
        try {
            res.render('login');
            
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
            return next(error);
        };
    };
    
    // Sign up page
    sginUp = (req, res, next) => {
        try {
            res.render('signup');
            
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
            return next(error);
        };
    };
    
    // Admin's page
    admin = (req, res, next) => {
        try {
            res.render('admin');
            
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
            return next(error);
        };
    };
    
    // Rank page
    rank = (req, res, next) => {
        try {
            res.render('rank');
            
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
            return next(error);
        }
    };
    
    // user's profile
    userProfile = (req, res, next) => {
        try {
            res.render('userprofile');
            
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
            return next(error);
        }
    };
    
    // Idol's profile
    idolProfile = (req, res, next) => {
        try {
            res.render('idolprofile');
            
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
            return next(error);
        }
    };
}

module.exports = Render;