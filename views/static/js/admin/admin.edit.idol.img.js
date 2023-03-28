async function editIdolImg() {
    try {
        let imgId = document.getElementById('modal-eidt-imgId').textContent;
        let idolImage = document.getElementById('modal-img-input').value;
        await axios.put('/admin/replaceIdolImg', { imgId, idolImage });
        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
}