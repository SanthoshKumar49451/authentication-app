import { resend } from "../../config/resend.js"
import { sendPasswordResetEmailTemplate} from './forgot.Email.js'



export const sendPasswordResetEmail=async(email,link)=>{
          const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Rest your password",
    html: sendPasswordResetEmailTemplate.replace('{link}',link),
  });

}