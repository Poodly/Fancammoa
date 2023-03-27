require("dotenv").config();
const env = process.env;

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){ 
        next();                 
    } 
    else {
        // res.status(403).send('로그인 필요');
        const message = "pleaselogin"
        res.redirect(`/login?error=${message}`);
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()){ 
        next();                  
    } 
    else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

// Type check -----------------------------------------------------------------------------------------------
exports.onlyAdmin = (req, res, next) => {
    const userType = req.user.userType;
    if (userType === env.ADMIN_KEY) {
        next();
    }
    else {
        const message = "일반회원은 접근할 수 없습니다."
        res.redirect(`/?error=${message}`);
    }
};
// -------------------------------------------------------------------------------------------------