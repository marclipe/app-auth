import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import nodemailer from "nodemailer"; 

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, 
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000, 
        }
      ); 
    } else if(emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });  
    }

    //nodemailer transport
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4901e8dd071704",
        pass: "9e5b29949209d9",
      },
    });

    const mailOptions = {
      from: '<your email id>',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`
    }

    const mailresponse = await transport.sendMail(mailOptions); 
    return mailresponse; 

  } catch (error: any) {
    return new Error(error.message);
  }
}