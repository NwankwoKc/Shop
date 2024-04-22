const nodemailer = require('nodemailer');
async function sendEmail(recipient,subject,content) {
    try{
        const transporter = nodemailer.createTransport({
            service:'Gmail',
            auth: {
                user:'nkelechi21@gmial.com',
                pass:'poiuytrePOIUYTRE101'
            }
        })
        const mailOptions = {
            from:'nkelechi21@gmial.com',
            to:recipient,
            subject:subject,
            text: content
        }

        await transporter.sendMail(mailOptions)
        console.log('Email sent succesfully')
    }catch{
        console.log("error")
    }
}

module.exports = sendEmail;