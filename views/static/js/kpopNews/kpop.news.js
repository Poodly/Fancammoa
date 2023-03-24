$(document).ready(async function() {
    kpopNews()
});


async function kpopNews() {
    // const apiKey1 = '76c4950e3de84354bc6050cf49beb6a5';
    // https://newsapi.org/v2/everything?q=bitcoin&apiKey=76c4950e3de84354bc6050cf49beb6a5
    var url = 'https://newsapi.org/v2/top-headlines?' +
            'q=k-pop&'+
            // 'country=kr&' +
            'apiKey=76c4950e3de84354bc6050cf49beb6a5';

    // var req = new Request(url);
    // fetch(req)
    //     .then(function(response) {
    //         console.log(response.json());
    //     })
        
    const response = await axios.get(url);
    console.log("kpopNews----response----", response)
}
// news-card-append