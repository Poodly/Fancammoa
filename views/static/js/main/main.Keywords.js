// const removeKeyword = ['직캠', '캠', '뮤비', '뮤직비디오', '입덕', 'fancam', 'cam', "MV", "인기가요"]

function isKeywordsIncluded(text, keywords) {
    
    const words = text.split(' '); // 공객기준 배열화
    wordsArr = words.map(str => str.replace(/[^\w\s]/gi, '')).filter(str => str.trim() !== ''); // 특수문자, 빈 문자 제외
    console.log(wordsArr);
    for (let i = 0; i < wordsArr.length; i++) {
        if (keywords.includes(wordsArr[i])) {
            console.log(`'${wordsArr[i]}' 키워드가 포함되어있습니다.-------`);
            return true;
            }
    }
    return false;
}

function isKeywordsIncludedArr(arr, keywords) {
    for (let i in arr) {
        if (keywords.includes(arr[i])) {
            console.log(`'${arr[i]}' 키워드가 포함되어있습니다.-------`);
            return true;
            }
    }
    return false;
}

// function removeKeywords(str, keywords) {
//     const regex = new RegExp(keywords.join('|'), 'gi');
//     console.log('removeKeywords--------',regex)
//     return str.replace(regex, '');
//     }

// function removeKeywords(str, keywords) {
//     let result = str;
//     for (let i = 0; i < keywords.length; i++) {
//       const keyword = keywords[i];
//       let index = result.indexOf(keyword);
//       while (index !== -1) {
//         result = result.slice(0, index) + result.slice(index + keyword.length);
//         index = result.indexOf(keyword, index);
//       }
//     }
//     return result;
//   }
  
 
async function getKeywords() {
    try {
        const response = await axios.get('/video/getKeywords');
        const keywords = response.data.keywords;
        
        const keywordArray = [];
        for (let i = 0; i < keywords.length; i++) {
            const keywordItem = keywords[i];
            let keyword   = keywordItem.keyword;
            keywordArray.push(keyword);    
            }
        return keywordArray;  

    } catch (error) {
        console.log('Error:', error);
    }
}

