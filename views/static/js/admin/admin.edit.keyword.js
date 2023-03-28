async function craeteKeyword() {
    try {
        const keyword = document.getElementById('modal-create-Keyword').value;
        await axios.post('/admin/saveKeywords', { keyword });        
        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
}

async function deleteKeyword() {
    try {
        const keyword = document.getElementById('admin-page-edit-keyword').textContent;
        await axios.delete('/admin/deleteKeyword', { data: { keyword } });
        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
};

async function editKeyword() {
    try {
        const keywordId = document.getElementById('admin-page-edit-keywordId').textContent;
        const keyword = document.getElementById('modal-edit-keyword').value;
        await axios.put('/admin/editKeywords', { keywordId, keyword });
        $("#exampleModal").modal("hide");

    }catch (error) {
        console.log('Error:', error);
    }
};