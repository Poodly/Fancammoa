$(document).ready(async function() {
    const urlParams  = new URLSearchParams(window.location.search);
    const errorItem  = urlParams.get('error');
    const emailValue = urlParams.get('email');
    const nickValue  = urlParams.get('nick');
    const exEmial    = urlParams.get('exEmial');
    const exNick     = urlParams.get('exNick');

    if(emailValue){
        $('#signUp-email').val(`${emailValue}`);
        $('#signUp-nick').val(`${nickValue}`);
    }

    if (exEmial) {
        $('#auth-validation').html(``);
        $('#auth-validation').html(`<p>* ${exEmial}</p>`);
    }

    if (exNick) {
        $('#auth-validation').html(``);
        $('#auth-validation').html(`<p>* ${exNick}</p>`);
    }

    if (errorItem === 'email') {
        $('#auth-validation').html(``);
        $('#auth-validation').html(`<p>* 올바른 이메일 형식으로 작성해 주세요.</p>`);
    }
    if (errorItem === 'nick') {
        $('#auth-validation').html(``);
        $('#auth-validation').html(`<p>* 닉네임은 3자 이상 20자 이하, 영문 또는 한글로 이루어져야 합니다.</p>`);
    }
    if (errorItem === 'password') {
        $('#auth-validation').html(``);
        $('#auth-validation').html(`<p>* 비밀번호는 6자 이상, 특수문자가 포함되어야 합니다.</p>`);
    }
});