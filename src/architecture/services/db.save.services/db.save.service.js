require("dotenv").config();
const axios = require('axios');
const searchQuery = "k-pop";

const DbSaveRepository = require('../../repositories/db.save.repository/db.save.repository');

class DbSaveService {
    dbSaveRepository = new DbSaveRepository();

    searchArtistsDbSave = async () => {
        const page = [1, 2, 3];

        // const newData = [];
        for (let i = 0; i < page.length; i++) {
            const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${searchQuery}&api_key=${process.env.LASTFMAPIKEY}&format=json&page=${page[i]}`;
            const response = await axios.get(apiUrl);
            const artists = response.data.topartists.artist;
            const idolNameArr = artists.map((artist) => ({ name: artist.name, }));
            
            for (let i = 0; i < idolNameArr.length; i++) {
                const exUser = await this.dbSaveRepository.exIdolName(idolNameArr[i].name); // db에 겹치는 이름이 있는지 체크
                if (!exUser) {
                    await this.dbSaveRepository.idolNameSave(idolNameArr[i].name);          // db에 겹치는 이름이 없을때만 저장.
                    // console.log(idolNameArr[i].name);
                } else {
                    console.log(`${idolNameArr[i].name}는 db에 겹치는 이름이 있습니다.`)       // db에 겹치는 이름이 있을때는 종료
                }
            }
        }
        return 
    };
}
  
module.exports = DbSaveService;