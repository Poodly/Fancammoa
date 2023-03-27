const { User } = require('../../models');

class AuthRepository {


    getExUser = async(email) => {
        try {
            const exUser = await User.findOne({ where: { email } });
            return exUser;
        }catch (error) {
            throw new Error(error.message);
        }
    }

    getExNick = async(nick) => {
        try {
            const exNick = await User.findOne({ where: { nick } });
            return exNick;
        }catch (error) {
            throw new Error(error.message);
        }
    }

    createUser = async (email, nick , password) => {
        try {
            await User.create({ email, nick, password });
        }catch (error) {
            throw new Error(error.message);
        }
    }

    deleteUser = async (email) => {
        try {
            await User.destroy({ where: { email } });
        }catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = AuthRepository;