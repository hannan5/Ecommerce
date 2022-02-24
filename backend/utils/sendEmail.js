process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const nodeMailer = require('nodemailer')

const sendEmail = async (options) =>{
    const transport = nodeMailer.createTransport({
        host:'smtp@gmail.com',
        port:465,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASS,
        },
    })

        const mailOption = {
            from:process.env.SMPT_SERVICE,
            to:options.email,
            subject: options.subject,
            text:options.message
        }

        await transport.sendMail(mailOption)
}
module.exports = sendEmail