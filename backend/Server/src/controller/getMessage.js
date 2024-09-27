import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
});

const sendMessageToServer = async (emailOptions) => {
    try {
        let info = await transporter.sendMail(emailOptions);
        console.log("Email sent: " + info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

const sendMessage = async (req, res) => {
    const { name, phone, email, message } = req.body;
    
    console.log(req.body)
  
    if (!name || !phone || !email || !message) {
        return res.status(401).json({ message: "All fields are required", success: false });
    }
    console.log(process.env.SERVER_EMAIL);
    console.log(process.env.SERVER_EMAIL_PASS)
    console.log(process.env.ADMIN_EMAIL)
    // Define email options
    const emailOptions = {
        from: `"Server" <${process.env.SERVER_EMAIL}>`, 
        to: process.env.ADMIN_EMAIL, // Email address to send enquiry to (admin email)
        subject: `New Enquiry from ${name}`, // Subject of the email
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
                <h2 style="background-color: #4CAF50; color: white; text-align: center; padding: 10px 0; border-radius: 5px;">
                    New Enquiry Received
                </h2>
                
                <p style="font-size: 16px; color: #333;">
                    Hello Admin,
                </p>
                
                <p style="font-size: 16px; color: #333;">
                    You have received a new enquiry with the following details:
                </p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Message:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; color: #333;">
                    Please respond to the enquiry as soon as possible.
                </p>
                
                <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">
                    Best regards,<br/>
                    Your Website Enquiry Service
                </p>
            </div>
        `
    };
    

    try {
        await sendMessageToServer(emailOptions);
        return res.status(200).json({ message: "Enquiry sent successfully!", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Failed to send the enquiry", success: false });
    }
};


export {sendMessage}
