function getVideoInfo(videoId) {
    const url = 'https://www.googleapis.com/youtube/v3/videos';
    const params = {
        part: 'snippet,statistics',
        id: videoId,
        key: 'AIzaSyB7N1NUj5heGDF_MH2pC8HxrZaT-M21Wvs'
    };
    return axios.get(url, { params })
        .then(response => {
            const item = response.data.items[0];

            const thumbnailUrl = item.snippet.thumbnails.high.url;
            const title        = item.snippet.title;
            const tags         = item.snippet.tags;
            const description  = item.snippet.description;
            const viewCount    = item.statistics.viewCount;

            return {
                thumbnailUrl,
                title,
                tags,
                description,
                viewCount
            };
        })
        .catch(error => console.log('Error:', error));
}