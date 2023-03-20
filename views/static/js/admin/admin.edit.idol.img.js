async function editIdolImg() {
    try {
        let imgId = document.getElementById('modal-eidt-imgId').textContent;
        let idolImage = document.getElementById('modal-img-input').value;

        const response = axios.put('/admin/replaceIdolImg', { imgId, idolImage });

        console.log(response.data, '이미지 PUT요청 성공');
        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
}
