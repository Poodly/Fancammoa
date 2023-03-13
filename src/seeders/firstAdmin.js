const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('ALSKFL!', 10); // 패스워드 해시

    return await queryInterface.bulkInsert('admin', [
      {
        adminEmail: 'qwe0238@naver.com',
        adminNick: 'Leonardo Neo',
        adminPw: hashedPassword,
        adminPhone: '01041940238',
        adminImg: 'default.png'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin', null, {});
  },
};