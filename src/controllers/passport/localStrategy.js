const passport = require('passport');
const bcrypt   = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');

const AuthService = require('../../services/auth.service')
const authService = new AuthService();

module.exports = () => {
    passport.use(new LocalStrategy({ 
        usernameField: 'email',      
        passwordField: 'password',   
        passReqToCallback : false,                                                  
    }, 

    async (email, password, done) => {
        try {
            const exUser = await authService.getExUser(email);
            const result = await bcrypt.compare(password, exUser.password);
            
            if (!exUser) {
                return done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
    
            if (!result) {
                return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
    
            return done(null, exUser);
        } catch (err) {
            console.error(err);
            return done(err);
        }
    }));
};