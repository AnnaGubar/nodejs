const nodemailer = require("nodemailer"); // почтовый сервер
require("dotenv").config();

const {META_PASSWORD} = process.env

// перед отправкой письма его нужно настроить
const nodemailerConfig = {
    host: "smtp.meta.ua", // к какому сайту подключаться что бы отправить письмо
    port: 465, // 25, 465, 2255,
    secure: true, // шифровать письмо
    auth: {
        user: "annagubar.work@meta.ua",
        pass: META_PASSWORD
    }
}

// формируем письмо для отправки
const email = {
    to: "annagubar.private@gmail.com",
    from: "annagubar.work@meta.ua",
    subject: "Новое письмо с сайта",
    html: "<p>Новое письмо с сайта</p>"
}

// создаем отправку
const transporter = nodemailer.createTransport(nodemailerConfig);

// отправляем
transporter.sendMail(email);