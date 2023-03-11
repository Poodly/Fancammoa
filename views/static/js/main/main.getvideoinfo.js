async function getVideoInfo(videoId) {
    try {
        const response = await axios.post('/video/getVideoInfo', { videoId });
        let thumbnailUrl = response.data.thumbnailUrl;
        let title        = response.data.title;
        let tags         = response.data.tags;
        let description  = response.data.description;
        let viewCount    = response.data.viewCount;

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