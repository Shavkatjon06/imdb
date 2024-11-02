import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    async sendVerificationCode(email, code) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #007bff; color: #fff; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">Email Verification</h1>
                </div>
                <div style="padding: 20px;">
                    <p style="font-size: 16px; line-height: 1.5;">
                        Your verification code is: <strong>${code}</strong>
                    </p>
                    <p style="font-size: 16px; line-height: 1.5;">
                        Please use this code to verify your account.
                    </p>
                </div>
                <div style="background-color: #f7f7f7; color: #555; padding: 10px 20px; text-align: center; font-size: 14px;">
                    <p style="margin: 0;">If you did not request this, please ignore this email.</p>
                </div>
            </div>
        `;

        await this.transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: 'Verification Code',
            html: htmlContent,
        });
    }
}

export default MailService