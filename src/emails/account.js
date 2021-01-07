const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


 const sendWelcomeEmail = (email,name) => transport.sendMail({
    from: 'daniel@gmail.com',
    to: email,
    subject: 'Welcome to our app',
    text:  `welcome to the task manager app ${name}. Let me know how you get along`
}, function(err, info) {
    if (err) {
        console.log(err)
    } else {
        console.log(info);
    }
});
 module.exports = {sendWelcomeEmail}
