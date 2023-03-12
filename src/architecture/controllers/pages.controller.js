class Render {
    // Main page
    main = async (req, res, next) => {
        try {
            await res.render('main');
            
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
            res.render('signUp');
            
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
    idolRank = (req, res, next) => {
        try {
            res.render('idolRank');
            
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
            return next(error);
        }
    };
    
    // Idol's profile
    idolProfile = (req, res, next) => {
        try {
            res.render('idolProfile');
            
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
            return next(error);
        }
    };

    // user's profile
    userProfile = (req, res, next) => {
        try {
            res.render('userProfile');
            
        } catch (error) {
            res.status(500).json({ errorMessage: error.message });
            return next(error);
        }
    };
}

module.exports = Render;