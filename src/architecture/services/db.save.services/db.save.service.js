require("dotenv").config();
const axios = require('axios');
const searchQuery = "k-pop";

const DbSaveRepository = require('../../repositories/db.save.repository/db.save.repository');

class DbSaveService {
    dbSaveRepository = new DbSaveRepository();

    searchArtistsDbSave = async () => {
        const page = [1];

        // const newData = [];
        for (let i = 0; i < page.length; i++) {
            const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${searchQuery}&api_key=${process.env.LASTFMAPIKEY}&format=json&page=${page[i]}`;
            const response = await axios.get(apiUrl);
            const artists = response.data.topartists.artist;
            const idolNameArr = artists.map((artist) => ({ name: artist.name, }));
            
            for (let i = 0; i < idolNameArr.length; i++) {
                await this.dbSaveRepository.idolNameSave(idolNameArr[i].name);
                // console.log(idolNameArr[i].name);
            }
        }
        return 
    };
}
  
module.exports = DbSaveService;

// 같은 이름의 데이터가 있을시 넘어가거나 덮어쓰게끔 하도록 만들기?
// 중복방지 로직을 만들어야함.