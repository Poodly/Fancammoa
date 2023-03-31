$(document).ready(async function() {
    $('#arrow-icon').hide()
    $("#spinner-box").show()
    await getKpopNews()
    await getTop3KpopNews()   
    $("#spinner-box").hide()
    $('#arrow-icon').show()
    window.scrollTo(0, 175);
});

$("#right-icon").click(async function(event) {
    event.preventDefault();
    $('#arrow-icon').hide()
    // $('#spinner-box').show()
    if (cursorArr.length < maxCount-1) {
        cursorArr.push(cursor);
    }else {
        cursorArr = []
        cursor = 0
    }
    await getKpopNews()
    $('#arrow-icon').show()
    // $("#spinner-box").hide()
    // window.scrollTo(0, 175);
});

$("#left-icon").click(async function(event) {
    event.preventDefault();
    $('#arrow-icon').hide()
    // $('#spinner-box').show()
    console.log(cursorArr.pop())
    cursor = cursorArr[cursorArr.length - 1];
    
    await getLeftKpopNews()
    $('#arrow-icon').show()
    // $("#spinner-box").hide()
    // window.scrollTo(0, 175);
});