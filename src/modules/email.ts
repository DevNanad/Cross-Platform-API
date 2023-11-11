import {createTransport} from  "nodemailer"


export const sendEmail = async (
    from:string, 
    to: string,
    subject:string, 
    html: string)=> {


        try {
            let mailOptions = ({
                from,
                to,
                subject,
                html,
            })

            const transporter = createTransport({
                host: "smtp-relay.sendinblue.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const info = await transporter.sendMail(mailOptions);

            console.log("Email sent: " + info);

            return info;
        } catch (error) {
            console.error("Error sending email:", error);
            throw error
        }
}