import { ContactPayload } from "../models/Contact";

export interface IContactRepository {
    send(data: ContactPayload): Promise<void>;
  }
  
