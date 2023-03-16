const axios = require('axios');

class SpotifyAccessTokenService {

    SpotifyAccessToken = async (clientId, clientSecret) => {
        const authOptions = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                grant_type: 'client_credentials'
            },
            json: true
        };
        const response = await axios(authOptions);
        return response.data.access_token;
    }
}

module.exports = SpotifyAccessTokenService