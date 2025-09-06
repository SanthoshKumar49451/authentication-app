
import { resend } from "../../config/resend.js"
import { verificationTokenTemplate } from "./email.template.js";

export const sendVerificationEmail=async(email,verificationToken)=>{
  console.log(email)
  console.log(resend)
    try {
          const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Verify your email address now",
    html: verificationTokenTemplate.replace('{verificationToken}',verificationToken),
  });
  console.log(data)
        
    } catch (error) {
        console.log(error+"error in sending verification email")
        
    }
}