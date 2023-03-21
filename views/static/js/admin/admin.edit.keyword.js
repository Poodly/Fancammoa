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


// async function deleteKeyword() {
//     try {
//         const idolId = document.getElementById('modal-idolId').textContent;
//         const response = await axios.delete('/admin/deleteIdol', { data: { idolId } });
//         console.log(response, ' DELETE요청 성공');

//         $("#exampleModal").modal("hide");

//     }catch (error) {
//         console.log('Error:', error);
//     }
// };

async function editKeyword() {
    try {
        const keywordId = document.getElementById('admin-page-edit-KeywordId').textContent;
        const keyword = document.getElementById('modal-edit-Keyword').value;

        console.log("editKeyword-------keywordId",keywordId)
        console.log("editKeyword-------keyword",keyword)

        const response = await axios.put('/admin/editKeywords', { keywordId, keyword });
        console.log(response, `${keyword} edit keyword 요청 성공`);

        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
};