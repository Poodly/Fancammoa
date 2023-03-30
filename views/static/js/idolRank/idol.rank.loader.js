document.addEventListener('DOMContentLoaded', async function() {
    $('#spinner-box').show()
    await makeRankCard();
    $('#spinner-box').hide()
    window.scrollTo(0, 175);
});