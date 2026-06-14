export interface ContactPayload {
    fullName: string;
    email: string;
    subject: string;
    message: string;
}


// Domain Constants

export const CONTACT_SUBJECTS: string[] = [
  'Novo Projeto',
  'Visitar Empreendimento',
  'Solicitar Orçamento',
  'Dúvidas sobre Financiamento',
  'Outros',
];

export interface CompanyInfo {
  phone:   string;
  email:   string;
  address: string;
}

export const COMPANY_INFO: CompanyInfo = {
  phone:   '+55 (45) 99813-0054',
  email:   'contato@hrnorte.com.br',
  address: 'Cancelli, Cascavel - PR',
};

export interface BusinessHours {
  weekdays: string;   // e.g. "09:00 - 18:00"
  saturday: string;
  sunday:   string;
}

export const BUSINESS_HOURS: BusinessHours = {
  weekdays: '09:00 - 18:00',
  saturday: 'Fechado',
  sunday:   'Fechado',
};