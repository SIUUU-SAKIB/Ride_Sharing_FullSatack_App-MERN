import nodemailer from "nodemailer";
import { enviromentVariables } from "../config/env";
// import { enviromentVariables } from "../config/env";
// import path from "node:path";
// import ejs from "ejs"
// import AppError from "./createError";

// const transporter = nodemailer.createTransport({
//     host:enviromentVariables.EMAIL_SENDER.SMTP_HOST,
//     port:Number(enviromentVariables.EMAIL_SENDER.SMTP_PORT),
//     secure:true,
//     auth:{
//         user:enviromentVariables.EMAIL_SENDER.SMTP_USER,
//         pass:enviromentVariables.EMAIL_SENDER.SMTP_PASSWORD
//     }
// })
// interface EmailAttachment {
//     filename:string,
//     content : Buffer | string,
//     contentType:string
// }

// interface SendEmailOptions {
//     to: string,
//     subject: string,
//     templateName: string,
//     templateData?: Record<string, any>,
//     attachments?: EmailAttachment[]
// }
// export const sendEmail = async ({ to,
//     subject,
//     templateData,
//     templateName,
//     attachments }: SendEmailOptions) => {
//     try {
//         const templatePath = path.join(__dirname, `templates/${templateName}.ejs`)
//         const html = await ejs.renderFile(templatePath, templateData)
//         const info = await transporter.sendMail({
//             from: enviromentVariables.EMAIL_SENDER.SMTP_FROM,
//             to: to,
//             subject: subject,
//             html: html,
//             attachments: attachments?.map(attachment => ({
//                 filename: attachment.filename,
//                 content: attachment.content,
//                 contentType: attachment.contentType
//             }))
//         })
//         console.log(`Email sent to ${to}: ${info.messageId}`)

//     } catch (error) {
//         console.log(error)
//         throw new AppError(401, 'Email error')
//     }
// }


export const sendEmail = async(to:string, subject:string, text:string) => {
    const transporter = nodemailer.createTransport({
        service : "gmail" ,
        auth:{
            user:enviromentVariables.EMAIL_SENDER.SMTP_USER,
            pass:enviromentVariables.EMAIL_SENDER.SMTP_PASSWORD
        }
    })
    await transporter.sendMail({
        from:enviromentVariables.EMAIL_SENDER.SMTP_FROM,
        to,
        subject,
        text
    })
}