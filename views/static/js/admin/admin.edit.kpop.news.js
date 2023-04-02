deleteNews = async () => {
  try {
    const newsIdElement = document.getElementById('newsId').textContent;
    const regex = /[^\d]/g;
    const newsId = newsIdElement.replace(regex, '');
    await axios.delete('/admin/deleteNews', { data: { newsId } });

  }catch (error) {
    console.error(error);
  }
}

editNewsInfo = async () => {
  try {
    const newsId   = document.getElementById('modal-news-eidt-newsId').textContent;                                                
    const newsLink = document.getElementById('modal-newsLink-input').value;                                                
    const newsImg  = document.getElementById('modal-newsImgText-input').value;                                                
    const newsDate = document.getElementById('modal-newsDate-input').value;                                                
    await axios.put('/admin/editNewsInfo', {
      newsId,
      newsLink,
      newsImg,
      newsDate,
  });

  }catch (error) {
    console.error(error);
  }
}

saveKpopNews = async () => {
  try {
      $("#news-refresh-icon").html('')
      $("#news-refresh-icon").html(`<div class="spinner-grow text-warning" style="width: 1.8rem; height: 1.8rem;" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div>`)
      await axios.post('/admin/saveKpopNews');
      window.location.reload();

  }catch (error) {
    console.error(error);
  }
}