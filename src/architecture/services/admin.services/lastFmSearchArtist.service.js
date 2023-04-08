require("dotenv").config();
const axios = require('axios');
const searchQuery = "k-pop";

const LastFmSearchArtistRepository = require('../../repositories/admin.repositories/lastFmSearchArtist.repository');

class LastFmSearchArtistService {
    constructor() {
        this.lastFmSearchArtistRepository = new LastFmSearchArtistRepository();
    }

    lastFmSearchArtist = async () => {
        try {

            const index = parseInt(process.env.LAST_FM_PAGE_INDEX);
            const page = [1]
            let count = 0
            for (let i = 0; i < index; i++) {
                count += 1;
                page.push(count);
            }
    
            let newIdolNameArr = []
            for (let i = 0; i < page.length; i++) {
                const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${searchQuery}&api_key=${process.env.LAST_FM_APIKEY}&format=json&page=${page[i]}`;
                const response = await axios.get(apiUrl);
                const artists = response.data.topartists.artist;
                const idolNameArr = artists.map((artist) => ({ name: artist.name, }));
                
                for (let i = 0; i < idolNameArr.length; i++) {
                    let name = idolNameArr[i].name;
                    if (/^[a-zA-Z0-9-\s!@#$%^&*()_+=[\]{}|\\;:'",.<>/?`~]*$/.test(name)) { // 이름이 영문자, 숫자, 특수문자, 하이픈, 공백으로만 이루어진 경우에만 추가// 한글은 제외                  
                        let saveName = name.replace(/[^a-zA-Z]/g, "");                     // 특수문자 없애기
                        const exIdolName = await this.lastFmSearchArtistRepository.exIdolName(saveName);
                        if (!exIdolName) {
                            await this.lastFmSearchArtistRepository.idolNameSave(saveName);
                            newIdolNameArr.push(saveName);
                        } else {
                            console.log(`${saveName}는 db에 겹치는 이름이 있습니다.`)
                        }
                    } else {
                        console.log(`${name}는 한글이므로 추가하지 않습니다.`) // 한글 이름인 경우 로그 출력
                    }
                }
            };
            return newIdolNameArr
            
        }catch (error) {
            console.error(error);
            throw new Error('Last Fm 아이돌 이름 생성 실패');
        }
    }
};
  
module.exports = LastFmSearchArtistService;
