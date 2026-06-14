import { ContactPayload } from "../models/Contact";
import { buildContactEmail } from "../templates/ContactEmailTemplate";
import { mailTransporter } from "@/infrastructure/mail/MailTransporter";

export class EmailService {
  static async send(data: ContactPayload) {
    await mailTransporter.sendMail({
      from: `<${process.env.SMTP_USER}>`,
      replyTo: data.email,
      to: process.env.CONTACT_EMAIL,
      subject: data.subject,
      text: data.message,
      html: buildContactEmail(
        data.fullName,
        data.email,
        data.message
      ),
    });
  }
}