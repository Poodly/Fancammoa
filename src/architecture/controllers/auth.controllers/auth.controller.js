const passport = require('passport')
const bcrypt   = require('bcrypt');
const Joi      = require('joi');
const AuthService = require('../../services/auth.service')

require("dotenv").config();
const env = process.env;

class AuthController {

    schema = Joi.object({
        email:Joi.string().email().required(),
        nick:Joi.string()
        .regex(/^[\w\uAC00-\uD7AF]+$/) // 영문, 한글 이외에는 입력불가
        .min(3)
        .max(20)
        .required(),
        password:Joi.string()
        .min(6)
        .max(100)
        .regex(/^(?=.*[!@#$%^&*])/) // 특수문자 하나이상 포함해야함
        .required()
    });

    authService = new AuthService();
//---------------------------------------------------------------------------------
    signUp = async (req, res, next) => {
        try {
            const { email, nick , password } = req.body;
            const exUser  = await this.authService.getExUser(email); 
            const exNick  = await this.authService.getExNick(nick); 
            
            if (exUser) {
                return res.redirect(`/signUp?error=&exEmial=이미 가입한 이메일입니다.&email=${email}&nick=${nick}`);
            }else if (exNick) {
                return res.redirect(`/signUp?error=&exNick=이미 가입한 닉네임입니다.&email=${email}&nick=${nick}`);
            }

            const { error } = this.schema.validate({ email, nick, password });
            if (error) {
                const errorMessage = error.details[0].message;
                const path = error.details[0].path;
                const type = error.details[0].type;
                const context = error.details[0].context;
                return res.redirect(`/signUp?error=${path}&email=${email}&nick=${nick}`)

            } else {
                const pwHash = await bcrypt.hash(password, 12);
                await this.authService.createUser(email, nick , pwHash);
                return res.redirect('/login');
            }

        } catch (error){
            console.error(error);
            next(error); 
        };
    };
    
//---------------------------------------------------------------------------------
    login = (req, res, next) => {
        passport.authenticate('local', (authError, user, info) => {
            if (authError) {
                console.error(authError);
                return next(authError);
            }
            if (!user) {    
                return res.redirect(`/login?error=${info.message}`);
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