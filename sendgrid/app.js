const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
    to: "annagubar.private@gmail.com",
    from: "annagubar.work@gmail.com", // заранее верифицированный на sendgrid.com
    subject: "Новое письмо с сайта",
    html: "<p>Новое письмо с сайта</p>"
}

sgMail.send(email)
    .then(()=> console.log("Success send"))
    .catch(error => console.log(error.message));