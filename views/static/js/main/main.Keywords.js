function isKeywordsIncluded(text, keywords) {
    
    const words = text.split(' '); // 공객기준 배열화
    // console.log(words)
    let wordsArr = words.map(str => str.replace(/[^\w\s]/gi, '')).filter(str => str.trim() !== ''); // 특수문자, 빈 문자 제외
    // console.log(wordsArr);
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