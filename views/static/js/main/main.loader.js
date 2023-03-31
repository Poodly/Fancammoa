$("#search-button").click(async function() {
    window.scrollTo(0, 185);
});

document.addEventListener('DOMContentLoaded', async function() {
    $("#spinner-box").show()
    await searchVideo();
    $("#spinner-box").hide()
    makeSpotifyInstaButton(query)
});