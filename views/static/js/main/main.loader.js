$("#search-button").click(async function() {
    window.scrollTo(0, 185);
});

document.addEventListener('DOMContentLoaded', async function() {
    await searchVideo();
    makeSpotifyInstaButton(query)
});