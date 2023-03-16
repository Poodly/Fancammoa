const searchKeyword = [
    '직캠', '캠', '뮤비', '뮤직비디오', '입덕', 'fancam', 'cam', "MV", "Official",
    "BTS", "방탄소년단", "EXO", "엑소", "TWICE", "트와이스", "BLACKPINK", "블랙핑크", 
    "Red Velvet", "레드벨벳", "NCT", "엔시티", "GOT7", "갓세븐", "ITZY", "있지", "SEVENTEEN", 
    "세븐틴", "MONSTA X", "몬스타엑스", "Super Junior", "슈퍼주니어", "SHINee", "샤이니", "ATEEZ", 
    "에이티즈", "TXT", "투모로우바이투게더", "Mamamoo", "마마무", "GFRIEND", "여자친구", "BTOB", "비투비", 
    "Stray Kids", "스트레이 키즈", "(G)I-DLE", "(여자)아이들", "OH MY GIRL", "오마이걸", "ASTRO", "아스트로", 
    "NU'EST", "뉴이스트", "VIXX", "빅스", "CLC", "씨엘씨", "APRIL", "에이프릴", "EVERGLOW", "에버글로우", "AB6IX", 
    "에이비식스", "Cravity", "크래비티", "TREASURE", "트레저", "ENHYPEN", "엔하이픈", "NewJeans", "뉴진스", 
    "LE SSERAFIM", "르세라핌" , "아이유", "IU", "Inkigayo", "인기가요", "장원영", "WONYOUNG", "IVE", "아이브", "Attention"
    ]

const removeKeyword = ['직캠', '캠', '뮤비', '뮤직비디오', '입덕', 'fancam', 'cam', "MV", "인기가요"]

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

function removeKeywords(str, keywords) {
    const regex = new RegExp(keywords.join('|'), 'gi');
    console.log('removeKeywords--------',regex)
    return str.replace(regex, '');
    }
 


