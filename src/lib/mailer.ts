import nodemailer from 'nodemailer';
import { config } from '../config';
import { MailOptions } from '../types/config.type';

const { auth, host, port, secure, from } = config.nodeMailerCred;
const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: secure,
  auth: {
    user: auth.user,
    pass: auth.pass,
  },
});

const sendEmail = async (receiverEmail: string, attachmentPath: string, filename: string) => {
  const mailOptions: MailOptions = {
    from: from,
    to: receiverEmail,
    subject: 'Transaction Report',
    text: 'Please find attached the transaction report.',
    attachments: [
      {
        path: attachmentPath,
      },
    ],
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Report sent to:- ${receiverEmail} sucessfully`);
  } catch (E) {
    console.log(`Error occured while sending to:- ${receiverEmail}`);
    console.log(E);
  }
};

export { sendEmail };
