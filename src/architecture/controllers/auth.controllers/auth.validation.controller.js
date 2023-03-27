const Joi = require('joi');

// Define a schema that describes the expected format of the input data
const schema = Joi.object({
    email:Joi.string().email().required(),
    nick:Joi.string()
    .regex(/^[\w\uAC00-\uD7AF]+$/) // 영문, 한글 이외에는 입력불가
    .min(3)
    .max(20)
    .required(),
    password:Joi.string()
    .min(6)
    .max(100)
    .regex(/^(?=.*[!@#$%^&*])/) // 특수문자 하나이상 포합해야함
    .required()
});

// Retrieve the input data when the form is submitted
$("#signup-button").click(async function(event) {
    event.preventDefault();

    const email    = document.querySelector('#signup-email').value;
    const nick     = document.querySelector('#signup-nick').value;
    const password = document.querySelector('#signup-password').value;

    console.log("email:",email)
    console.log("nick:",nick)
    console.log("password:",password)
    alert(email);
    alert(nick);
    alert(password);


    // Validate the input data against the schema using Joi
    const { error } = schema.validate({ email, nick, password });

    if (error) {
        // If there are validation errors, display them to the user
        const errorMessage = error.details[0].message;
        // document.querySelector('#error-message').textContent = errorMessage;
        // document.querySelector('#email').classList.add('is-invalid');
        // document.querySelector('#password').classList.add('is-invalid');
        alert(errorMessage);
    } else {
    // If there are no validation errors, submit the form to the server
    form.submit();
    }
});