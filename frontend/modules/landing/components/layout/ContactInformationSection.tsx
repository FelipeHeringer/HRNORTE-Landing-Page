'use client'

import { useRef } from "react"
import { Chevron, RoundedLocation, RoundedMail, RoundedPhone } from "@/shared/assets/Icons"
import { useScreenSize } from "@/shared/hooks/useScreenSize"
import { Button, ButtonType } from "@/shared/components/Button"
import { ContactInformation } from "../ContactInformation"
import { FormDropDown, type FormDropDownRef } from "@/shared/components/FormDropdown"
import { FormInput, type FormInputRef } from "@/shared/components/FormInput"
import { FormLabel } from "@/shared/components/FormLabel"
import { FormTextArea, type FormTextAreaRef } from "@/shared/components/FormTextArea"
import { useContactForm } from "../../viewmodels/useContactForm"
import { AlertMessage, AlertMessageType } from "@/shared/components/AlertMessage"
import { BUSINESS_HOURS, COMPANY_INFO, CONTACT_SUBJECTS } from "@/modules/contact/models/Contact"

const CONTACT_ITEMS = [
    { icon: <RoundedPhone />, title: "Telefone", description: COMPANY_INFO.phone },
    { icon: <RoundedMail />, title: "E-mail", description: COMPANY_INFO.email },
    { icon: <RoundedLocation />, title: "Endereço", description: COMPANY_INFO.address },
] as const;

export default function ContactInformationSection() {
    const screen = useScreenSize();
    const isMobile = screen === 'mobile';

    const {
        fullNameRef,
        emailRef,
        subjectRef,
        messageRef,
        status,
        handleSubmit,
        dismiss,
    } = useContactForm();

    const alert =
        status.state === "success" || status.state === "error"
            ? {
                type: status.state === "success" ? AlertMessageType.SUCCESS : status.type,
                title: status.title,
                message: status.message,
            }
            : null;

    return (
        <section id="contact" className="py-12 bg-off-white">
            <div className={`container flex
                    ${isMobile ? 'flex-col gap-12' : 'justify-between gap-8'}
                `}>
                <div className={`flex flex-col gap-12 justify-between h-full  md:w-[40%]`}>
                    <div className="flex flex-col gap-5">
                        <h3 className="font-family-primary font-bold text-h2">Entre em Contato</h3>
                        {!isMobile && (
                            <p>Pronto para transformar sua visão em realidade? Nossa equipe de especialistas
                                está à disposição para discutir seu próximo projeto de alto padrão.</p>
                        )}
                    </div>
                    {/* Contact Informations */}
                    <div className="flex flex-col gap-20">
                        {/* Company Informations */}
                        <span className="flex flex-col gap-5">
                            {CONTACT_ITEMS.map((item, index) => (
                                <span key={index}>
                                    <ContactInformation icon={item.icon} title={item.title} description={item.description} />
                                </span>
                            ))}
                        </span>
                        <div className="flex flex-col py-6 px-6 bg-[#F7F3F1] rounded-lg shadow-sm gap-3">
                            <p className="font-family-primary font-bold text-body">Horário de Atendimento</p>
                            <div className="flex justify-between">
                                <p className="font-family-primary text-sm-custom text-[#474741]">Segunda - Sexta</p>
                                <p className="font-family-primary text-sm-custom text-[#474741]">{BUSINESS_HOURS.weekdays}</p>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between">
                                <p className="font-family-primary text-sm-custom text-[#474741]">Sábado / Domingo</p>
                                <p className="font-family-primary text-sm-custom text-[#474741]">{BUSINESS_HOURS.saturday}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`md:pl-3 md:w-[45%]`}>
                    {/* Contact Form  */}
                    <form
                        className="flex flex-col gap-6 py-8 px-8 bg-[#FFFFFF] rounded-lg"
                        onSubmit={e => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <h4 className="font-family-primary font-bold text-charcoal text-h3">
                            Envie uma Mensagem
                        </h4>

                        {/* Alert — aparece só quando há feedback */}
                        {alert && (
                            <div className="fixed bottom-3 right-3">
                                <AlertMessage
                                    type={alert.type}
                                    title={alert.title}
                                    message={alert.message}
                                    onClose={dismiss}
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <FormLabel title={"NOME COMPLETO"} />
                                <FormInput ref={fullNameRef} placeholder={"Seu Nome"} type={"name"} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <FormLabel title={"E-MAIL"} />
                                <FormInput ref={emailRef} placeholder={"seu@email.com"} type={"email"} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <FormLabel title={"ASSUNTO"} />
                                <FormDropDown ref={subjectRef} icon={<Chevron />} values={CONTACT_SUBJECTS} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <FormLabel title={"MENSAGEM"} />
                                <FormTextArea ref={messageRef} rows={3} placeholder={"Como podemos ajudar?"} />
                            </div>
                            <div className={`md:flex md:justify-end md:pt-2`}>
                                <Button
                                    text={status.state === "loading" ? "ENVIANDO..." : "ENVIAR MENSAGEM"}
                                    type={ButtonType.Tertiary}
                                    onClick={handleSubmit}
                                    disabled={status.state === "loading"}
                                    className={isMobile ? "w-full" : "px-2 w-[40%]"}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section >
    )
}