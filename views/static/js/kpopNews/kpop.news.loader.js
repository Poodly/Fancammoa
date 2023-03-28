$(document).ready(async function() {
    await getTop3KpopNews()   
    await getKpopNews()
    window.scrollTo(0, 175);
});

$("#right-icon").click(async function(event) {
    event.preventDefault();
    if (cursorArr.length < maxCount-1) {
        cursorArr.push(cursor);
    }else {
        cursorArr = []
        cursor = 0
    }
    await getKpopNews()
    window.scrollTo(0, 175);
});

$("#left-icon").click(async function(event) {
    event.preventDefault();

    console.log(cursorArr.pop())
    cursor = cursorArr[cursorArr.length - 1];
    
    await getLeftKpopNews()
    window.scrollTo(0, 175);
});