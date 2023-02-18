exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){ 
        next();                 
    } 
    else {
        // res.status(403).send('로그인 필요');
        const message = "pleaselogin"
        res.redirect(`/auth/login/?error=${message}`);
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

exports.isGeneralIn = (req, res, next) => {
    const userType = req.user.userType;
    if (userType === 1) {
        console.log("user.userType---------------", res.locals.user.userType);
        next();
    }
    else {
        const message = "관리자는 접근할 수 없습니다."
        res.redirect(`/?error=${message}`);
    }
};

exports.isAdminIn = (req, res, next) => {
    const userType = req.user.userType;
    if (userType === 2) {
        next();
    }
    else {
        const message = "일반회원은 접근할 수 없습니다."
        res.redirect(`/?error=${message}`);
    }
};