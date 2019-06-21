// Use at least Nodemailer v4.1.0
require('dotenv').config();
const nodemailer = require('nodemailer');
console.log('Credentials obtained, sending message...');
console.log(" check .env user : " + process.env.GMAIL_USER);
console.log(" check .env passwd : " + process.env.GMAIL_PASSWORD);

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    // Message object
    let message = {
        from: process.env.GMAIL_USER,
        to: 'quentin.becquart@gfi.fr',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
    });