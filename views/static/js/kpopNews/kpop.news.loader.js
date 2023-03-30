$(document).ready(async function() {
    $('.arrow-icons').show()
    $("#spinner-box").hide()
    await getTop3KpopNews()   
    await getKpopNews()
    $('.arrow-icons').show()
    $("#spinner-box").hide()
    // window.scrollTo(0, 175);
});

$("#right-icon").click(async function(event) {
    event.preventDefault();
    $('.arrow-icons').show()
    $('.arrow-icons').hide()
    if (cursorArr.length < maxCount-1) {
        cursorArr.push(cursor);
    }else {
        cursorArr = []
        cursor = 0
    }
    await getKpopNews()
    $('.arrow-icons').show()
    $("#spinner-box").hide()
    // window.scrollTo(0, 175);
});

$("#left-icon").click(async function(event) {
    event.preventDefault();
    $('.arrow-icons').show()
    $('.arrow-icons').hide()
    console.log(cursorArr.pop())
    cursor = cursorArr[cursorArr.length - 1];
    
    await getLeftKpopNews()
    $('.arrow-icons').show()
    $("#spinner-box").hide()
    // window.scrollTo(0, 175);
});