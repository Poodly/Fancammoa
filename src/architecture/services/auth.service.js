const AuthRepository = require('../repositories/auth.repository');

class AuthService {
    authRepository = new AuthRepository();

    getExUser = async (email) => {
        try {
            const exUser = await this.authRepository.getExUser(email);
            return exUser;
        }catch (error) {
            throw new Error(error.message);
        }
    }

    createUser = async (email, nick , password) => {
        try {
            await this.authRepository.createUser(email, nick , password);
        }catch (error) {
            throw new Error(error.message);
        }
    }

    deleteUser = async (email) => {
        try {
            await this.authRepository.deleteUser(email);
        }catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = AuthService;