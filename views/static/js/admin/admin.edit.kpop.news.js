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
