const passport = require('passport')
const bcrypt   = require('bcrypt');
const AuthService = require('../services/auth.service')

require("dotenv").config();
const env = process.env;

class AuthController {
    authService = new AuthService();
//---------------------------------------------------------------------------------
    signUp = async (req, res, next) => {
        try {
            const { email, nick , password } = req.body;
            const exUser  = await this.authService.getExUser(email); 
            
            if (exUser) {
                return res.redirect('/signup?error=exist');
            }
    
            const pwHash = await bcrypt.hash(password, 12);
            await this.authService.createUser(email, nick , pwHash);
    
            return res.redirect('/login');
        } catch (error){
            console.error(error);
            next(error); 
        };
    };
    
//---------------------------------------------------------------------------------
    login = (req, res, next) => {
        passport.authenticate('local', (authError, user, info) => {
            console.log('authError---------------',authError)
            console.log('user---------------',user)
            console.log('info---------------',info)
            if (authError) {
                console.error(authError);
                return next(authError);
            }
            if (!user) {    
                return res.redirect(`/?loginError=${info.message}`);
            }
            return req.login(user, (loginError) => { 
                if (loginError) {  
                    console.error(loginError);
                    return next(loginError);
                }
                console.log('-------------login succeed')
                return res.redirect('/');
            });
        })(req, res, next);
    };
    
//---------------------------------------------------------------------------------
    logout = (req, res, next) => { 
        try {
            req.logout(() => {
                console.log('-------------logout succeed')
                res.redirect('/');
            })
        } catch (error) {
            console.error(error);
            next(error);
        };
    };
    
//---------------------------------------------------------------------------------
    withdrawal = async (req, res, next) => {
        try {
            const { password, passwordConfirm } = req.body;
            const pwCompare = await bcrypt.compare(password, req.user.password);
            const email     = req.user.email;
    
            if (password !== passwordConfirm) {
                redirect(`/?withdrawalError=비밀번호 확인이 틀렸습니다`);
            }
    
            if (password === passwordConfirm && !pwCompare) {
                return res.redirect(`/?withdrawalError=비밀번호를 확인하세요`);
            }
    
            if (password === passwordConfirm && pwCompare) {
                await this.authService.deleteUser(email);
                console.log('withdrawal succeed');
                req.logout(() => {
                    return res.redirect('/');
                })
            } 
    
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    // 유저프로필 버튼, 어드민 버튼 생성에 사용
    checkAdmin = (req, res, next) => {
        try {
            const userType = req.user.userType
            if(userType === env.ADMIN_KEY) {
                res.status(200).json({ data: "Admin true" });
            }else {
                res.status(200).json({ data: "Admin false" });
            }
        } catch (error) {
            console.error(error);
            next(error);
        };
    }
};
// return res.status(400).json({ message: "비밀번호 확인이 틀렸습니다" }) 

module.exports = AuthController;