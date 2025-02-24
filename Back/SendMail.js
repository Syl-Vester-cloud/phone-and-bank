    import nodemailer from 'nodemailer';
    import dotenv from 'dotenv';
    
    dotenv.config(); // Load environment variables
    
    // Configure your email transporter (Use your SMTP provider)
    const transporter = nodemailer.createTransport({
        service: "gmail",  // Use 'gmail', 'yahoo', 'outlook' or your SMTP provider
        auth: {
            user: process.env.EMAIL_USER,  // Your email address
            pass: process.env.EMAIL_PASS,  // Your email password or app password
        },
    });
    
    // Function to send an email
    const SendMail = async (to, subject, text) => {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text,
        };
    
        try {
            await transporter.sendMail(mailOptions);
            console.log("✅ Email sent successfully to", to);
        } catch (error) {
            console.error("❌ Error sending email:", error);
        }
    };
    

export default SendMail;