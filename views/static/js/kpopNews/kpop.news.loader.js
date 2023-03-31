$(document).ready(async function() {
    $('#arrow-left-icon').hide()
    $('#arrow-right-icon').hide()
    $("#spinner-box").show()
    await getKpopNews()
    await getTop3KpopNews()   
    $('#arrow-left-icon').show()
    $('#arrow-right-icon').show()
    $("#spinner-box").hide()
    window.scrollTo(0, 175);
});

$("#right-icon").click(async function(event) {
    event.preventDefault();
    $('#arrow-left-icon').hide()
    $('#arrow-right-icon').hide()
    if (cursorArr.length < maxCount-1) {
        cursorArr.push(cursor);
    }else {
        cursorArr = []
        cursor = 0
    }
    await getKpopNews()
    $('#arrow-left-icon').show()
    $('#arrow-right-icon').show()
    // window.scrollTo(0, 175);
});

$("#left-icon").click(async function(event) {
    event.preventDefault();
    $('#arrow-left-icon').hide()
    $('#arrow-right-icon').hide()
    console.log(cursorArr.pop())
    cursor = cursorArr[cursorArr.length - 1];
    
    await getLeftKpopNews()
    $('#arrow-left-icon').show()
    $('#arrow-right-icon').show()
    // window.scrollTo(0, 175);
});