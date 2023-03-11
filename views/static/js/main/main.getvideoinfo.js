async function getVideoInfo(videoId) {
    try {
        const response = await axios.post('/video/getVideoInfo', { videoId });
        const thumbnailUrl = response.data.thumbnailUrl;
        const title        = response.data.title;
        const tags         = response.data.tags;
        const description  = response.data.description;
        const viewCount    = response.data.viewCount;

        return {
            thumbnailUrl,
            title,
            tags,
            description,
            viewCount
        };
    } catch (error) {
        console.error(error);
    }
}