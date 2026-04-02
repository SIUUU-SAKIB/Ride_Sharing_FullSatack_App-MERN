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
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: enviromentVariables.EMAIL_SENDER.SMTP_USER,
    pass: enviromentVariables.EMAIL_SENDER.SMTP_PASSWORD
  }
})

export const sendVerifyEmail = async (to: string, subject: string, link: string) => {
  const html = `
  <div style="background: #f4f6f8; padding: 40px 0; font-family: 'Segoe UI', Arial, sans-serif;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); text-align: center;">

      <h2 style="color: #333; margin-bottom: 10px;">🎉 Welcome!</h2>
      <p style="color: #666; font-size: 14px; margin-bottom: 25px;">
        Please verify your email to activate your account.
      </p>

      <!-- Button -->
      <a href="${link}" 
         style="display: inline-block; padding: 14px 28px; background: #4f46e5; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
         Verify Email
      </a>
  
      <!-- Fallback link -->
      <p style="margin-top: 20px; font-size: 13px; color: #888;">
        Or copy and paste this link into your browser:
      </p>

      <p style="word-break: break-all; font-size: 12px; color: #4f46e5;">
        ${link}
      </p>
          <p style="text:18px; text-align:center; color:#4f46e5">This link will expire in 5 minutes</p>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 13px; color: #999;">
        If you didn’t create an account, you can safely ignore this email.
      </p>

      <p style="font-size: 12px; color: #bbb; margin-top: 20px;">
        © 2026 Ride Sharing App
      </p>

    </div>
  </div>
  `;

  await transporter.sendMail({
    from: enviromentVariables.EMAIL_SENDER.SMTP_FROM,
    to,
    subject: "Verify Your Email",
    html,
  });
};

export const sendOtp = async (to: string, subject: string, otp?: string) => {

  const emailHtml = `
        <div style="background: #f4f6f8; padding: 40px 0; font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); text-align: center;">
    
    <!-- Logo / Title -->
    <h2 style="margin-bottom: 10px; color: #333;">🔐 Verify Your Identity</h2>
    <p style="color: #777; font-size: 14px; margin-bottom: 25px;">
      Use the OTP below to complete your action
    </p>

    <!-- OTP BOX -->
    <div style="background: #f1f5ff; border: 2px dashed #4f46e5; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
      <span style="font-size: 36px; font-weight: bold; color: #4f46e5; letter-spacing: 8px;">
        ${otp}
      </span>
    </div>

    <!-- Expiry -->
    <p style="color: #555; font-size: 14px;">
      ⏳ This code will expire in <strong>10 minutes</strong>
    </p>

    <!-- Divider -->
    <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />

    <!-- Footer -->
    <p style="font-size: 13px; color: #999;">
      If you didn’t request this, you can safely ignore this email.
    </p>

    <p style="font-size: 12px; color: #bbb; margin-top: 20px;">
      © 2026 Ride Sharing App
    </p>

  </div>
</div>
    `;
  await transporter.sendMail({
    from: enviromentVariables.EMAIL_SENDER.SMTP_FROM,
    to,
    subject,
    html: emailHtml
  })
}
