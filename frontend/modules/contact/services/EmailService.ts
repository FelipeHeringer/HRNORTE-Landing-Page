import { ContactPayload } from "../models/Contact";
import { MailContactRepository } from "../repositories/MailContactRepository";

export class EmailService {
  mailContactRepository = new MailContactRepository();
  
  async send(data: ContactPayload) {
    await this.mailContactRepository.send(data);
  }
}