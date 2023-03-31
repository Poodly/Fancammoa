document.addEventListener('DOMContentLoaded', async function() {
    $("#spinner-box").show()
    await searchLikeVideos();
    $("#spinner-box").hide()
    window.scrollTo(0, 185);
});