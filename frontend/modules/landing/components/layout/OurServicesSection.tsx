'use client';

import { Arch, Construction, Management } from "@/shared/assets/Icons"
import { useScreenSize } from "@/shared/hooks/useScreenSize"
import { CapabilityCard } from "../CapabilityCard"

export default function OurServicesSection() {
    const screen = useScreenSize();
    const isMobile = screen === 'mobile';

    const capabilities = [
        { id: 1, title: "Design Arquitetônico", description: "Planejamento abrangente e estratégias de design que harmonizam estética impecável com integridade estrutural funcional.", icon: <Arch /> },
        { id: 2, title: "Engenharia Estrutural", description: "Soluções avançadas garantindo segurança, durabilidade e resiliência para projetos residenciais e comerciais de alto padrão.", icon: <Construction /> },
        { id: 3, title: "Gestão de Obras", description: "Gestão de projeto de ponta a ponta, coordenando os melhores artesãos para dar vida às suas plantas com perfeição.", icon: <Management /> }
    ]


    return (
        <section id="services" className=" container bg-off-white py-8 flex flex-col gap-6">
            <div className={`flex gap-2
                        ${isMobile ? 'flex-col ' : 'justify-between items-center'}
                `}>
                <div className="flex flex-col gap-3">
                    <p className="text-gold font-family-primary font-bold text-sm-custom">CAPACIDADES ESPECIALISTAS</p>
                    <h2 className="text-charcoal font-bold text-h2 font-family-primary">Nossos Serviços</h2>
                </div>
                <div>
                    <p className={`text-charcoal font-family-primary pt-2 text-left
                        ${!isMobile && 'max-w-[496px]'}
                        `}>
                        Desde a conceituação arquitetônica até o
                        polimento estrutural final, entregamos precisão em
                        cada metro quadrado do seu projeto.
                    </p>
                </div>
            </div>
            <div className={`flex gap-4
                    ${isMobile ? 'flex-col' : 'justify-between'}
                `}>
                {capabilities.map((capability, index) => (
                    <span key={index}>
                        <CapabilityCard id={capability.id} title={capability.title} description={capability.description} icon={capability.icon} />
                    </span>
                ))}
            </div>
        </section>
    )
}