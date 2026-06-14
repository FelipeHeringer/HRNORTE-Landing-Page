import { mailTransporter } from "@/infrastructure/mail/MailTransporter";
import { ContactPayload } from "../models/Contact";
import { IContactRepository } from "./IContactRepository";
import { buildContactEmail } from "../templates/ContactEmailTemplate";

export class MailContactRepository implements IContactRepository {
    async send(data: ContactPayload) {
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