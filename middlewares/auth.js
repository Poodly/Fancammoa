require("dotenv").config();
const env = process.env;

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){ 
        next();                 
    } 
    else {
        // res.status(403).send('로그인 필요');
        const message = "pleaselogin"
        res.redirect(`/login/?error=${message}`);
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
exports.onlyGeneral  = (req, res, next) => {
    const userTypeKey = req.user.userTypeKey;
    if (userTypeKey === env.USERKEY) {
        console.log("user.userTypeKey---------------", res.locals.user.userTypeKey);
        next();
    }
    else {
        const message = "관리자는 접근할 수 없습니다."
        res.redirect(`/?error=${message}`);
    }
};

exports.onlyAdmin = (req, res, next) => {
    const adminKey = req.user.userTypeKey;
    if (adminKey === env.ADMINKEY) {
        next();
    }
    else {
        const message = "일반회원은 접근할 수 없습니다."
        res.redirect(`/?error=${message}`);
    }
};
// -------------------------------------------------------------------------------------------------