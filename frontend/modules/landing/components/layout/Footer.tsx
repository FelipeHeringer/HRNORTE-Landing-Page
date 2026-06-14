'use client';

import { Logo, Mail, Location, Phone, RoundedShare, RoundedWorld } from "@/shared/assets/Icons";
import { useScreenSize } from "@/shared/hooks/useScreenSize";
import { DirectContact } from "../DirectContact";
import Link from "@/shared/components/Link";
import { COMPANY_INFO } from "@/modules/contact/models/Contact";

const CONTACT_ITEMS = [
    { icon: <Phone />, description: COMPANY_INFO.phone },
    { icon: <Mail />, description: COMPANY_INFO.email },
    { icon: <Location colors={["#D4AF37"]} />, description: COMPANY_INFO.address }
] as const;

export default function Footer() {
    const screen = useScreenSize();
    const isMobile = screen === 'mobile';

    const currentYear = new Date().getFullYear();

    return (
        <section className="bg-charcoal py-20 flex flex-col gap-6">
            <div className={`container flex gap-9
                    ${isMobile ? 'flex-col' : 'justify-between'}
                `}>
                <div className={`md:max-w-[40%]`}>
                    {/* About the company */}
                    <div className="flex flex-col gap-6">
                        <Logo colors={["#C1BEBF", "#C1BEBF", "#C1BEBF"]} />
                        <p className="font-family-primary text-[#858481] text-sm-custom">Elevando padrões com engenharia de precisão e design atemporal. Sua visão transformada em estruturas que marcam gerações.
                        </p>
                        <div className="flex gap-4">
                            <RoundedWorld />
                            <RoundedShare />
                        </div>
                    </div>
                </div>
                <div className={`flex gap-4
                        ${isMobile ? 'flex-col' : 'justify-around w-[45%]'}
                    `}>
                    {/* Quick Links*/}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-family-primary font-bold text-off-white text-[17px]">Links Rápidos</h4>
                        <div className="flex flex-col gap-3 list-none">
                            <Link text={"Empreendimentos"} href="#portfolio" />
                            <Link text={"Contato"} href="#contact" />
                            <Link text={"Serviços"} href="#services" />
                        </div>
                    </div>
                    {/* Legal */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-family-primary font-bold text-off-white text-[17px]">Legal</h4>
                        <div className="flex flex-col gap-3 list-none">
                            <Link text={"Privacidade"} />
                            <Link text={"Termos de Uso"} />
                            <Link text={"Cookies"} />
                        </div>
                    </div>
                    {/* Direct Contact*/}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-family-primary font-bold text-off-white text-[17px]">Contato Direto</h4>
                        <div className="flex flex-col gap-3">
                            {CONTACT_ITEMS.map((item, index) => (
                                <span key={index}>
                                    <DirectContact icon={item.icon} description={item.description} />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-charchoal/w800" />
            {/* Copyright */}
            <div className={`md:flex md:justify-center md:items-center`}>
                <p className="font-family-primary text-[#858481] text-sm-custom">© {currentYear} HRNORTE Construtura e Incorporadora. Todos os direitos
                    reservados.</p>
            </div>
        </section>
    )
}