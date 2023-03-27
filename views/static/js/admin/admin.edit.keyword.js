async function craeteKeyword() {
    try {
        const keyword = document.getElementById('modal-create-Keyword').value;

        console.log("craeteKeyword-------keyword",keyword)
        const response = await axios.post('/admin/saveKeywords', { keyword });
        console.log(response, `${keyword} Craete keyword 요청 성공`);
        
        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
}


async function deleteKeyword() {
    try {
        const keyword = document.getElementById('admin-page-edit-keyword').textContent;
        const response = await axios.delete('/admin/deleteKeyword', { data: { keyword } });
        console.log(response, `키워드 Id:${keyword} DELETE요청 성공`);

        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
};

async function editKeyword() {
    try {
        const keywordId = document.getElementById('admin-page-edit-keywordId').textContent;
        const keyword = document.getElementById('modal-edit-keyword').value;

        console.log("editKeyword-------keywordId",keywordId)
        console.log("editKeyword-------keyword",keyword)

        const response = await axios.put('/admin/editKeywords', { keywordId, keyword });
        console.log(response, `${keyword} edit keyword 요청 성공`);

        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
};