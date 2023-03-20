document.addEventListener('DOMContentLoaded', async function() {
    await handleAdminPageButton();
});

async function handleAdminPageButton() {
    try {
        $('.head_list').html('');

        const response = await axios.get('/auth/checkAdmin');
        let checkAdmin = response.data;
    
        if (checkAdmin.data === "Admin true") {
            const tempHtml = `<p><a href="/idolRank">아이돌 순위</a></p>
                                <p id="profile"><a href="/kpopNews">K-POP뉴스</a></p>
                                <p id="profile"><a href="/userProfile">마이페이지</a></p>
                                <p id="profile"><a href="/adminPage">어드민페이지</a></p>`
            $('.head_list').html(tempHtml);                    
        } 

        else if (checkAdmin.data === "Admin false") {
            const tempHtml = `<p><a href="/idolRank">아이돌 순위</a></p>
                                <p id="profile"><a href="/kpopNews">K-POP뉴스</a></p>
                                <p id="profile"><a href="/userProfile">마이페이지</a></p>`
            $('.head_list').html(tempHtml);
        } 
        else {
            const tempHtml = `<p><a href="/idolRank">아이돌 순위</a></p>
                                <p id="profile"><a href="/kpopNews">K-POP뉴스</a></p>
                                <p id="profile"><a href="/userProfile">마이페이지</a></p>`
            $('.head_list').html(tempHtml);
            checkAdmin = ''
        }

    }catch (error) {
        console.log('Error:', error);
    }

}