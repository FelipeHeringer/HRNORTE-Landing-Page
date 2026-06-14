import { ContactPayload } from "../models/Contact";

export class ContactValidator {
  static validate(data: ContactPayload) {
    const { fullName, email, subject, message } = data;

    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      throw new Error(JSON.stringify({ "statusCode": 422, "message": "Campos obrigatórios não preenchidos." }));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error(JSON.stringify({ "statusCode": 422, "message": "E-mail inválido." }));
    }
  }
}