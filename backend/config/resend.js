import {Resend} from 'resend'
import dotnev from 'dotenv'

dotnev.config()



export const resend=new Resend(process.env.RESEND_API_KEY)