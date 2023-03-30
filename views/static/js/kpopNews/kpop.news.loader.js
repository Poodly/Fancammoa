$(document).ready(async function() {
    $('.arrow-icons').hide()
    $("#spinner-box").show()
    await getKpopNews()
    await getTop3KpopNews()   
    $("#spinner-box").hide()
    $('.arrow-icons').show()
    window.scrollTo(0, 175);
});

$("#right-icon").click(async function(event) {
    event.preventDefault();
    $('.arrow-icons').hide()
    // $('#spinner-box').show()
    if (cursorArr.length < maxCount-1) {
        cursorArr.push(cursor);
    }else {
        cursorArr = []
        cursor = 0
    }
    await getKpopNews()
    await getTop3KpopNews() 
    $('.arrow-icons').show()
    // $("#spinner-box").hide()
    // window.scrollTo(0, 175);
});

$("#left-icon").click(async function(event) {
    event.preventDefault();
    $('.arrow-icons').hide()
    // $('#spinner-box').show()
    console.log(cursorArr.pop())
    cursor = cursorArr[cursorArr.length - 1];
    
    await getLeftKpopNews()
    await getTop3KpopNews() 
    $('.arrow-icons').show()
    // $("#spinner-box").hide()
    // window.scrollTo(0, 175);
});