'use client';

import heroImage from "@/shared/assets/images/HeroImage4k.png"
import { useScreenSize } from "@/shared/hooks/useScreenSize"
import { Button, ButtonType } from "@/shared/components/Button"
import Image from "next/image";

export default function HeroSection() {
    const screen = useScreenSize();
    const isMobile = screen === 'mobile';

    return (
        <section>

            <div className="relative">
                <Image src={heroImage}
                    className={`
                        w-full object-center object-cover
                        ${isMobile ? 'h-[520px]' : 'h-[90vh]'}
                    `} alt={"Hero image"} />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className={`
                        absolute inset-0 flex flex-col items-start
                        ${isMobile ? 'justify-end pb-10 container' : 'justify-center pb-6 pl-16'}
                    `}>
                    <h1 className={`
                                font-bold text-off-white
                                ${isMobile ? 'text-h2 max-w-xs' : 'text-hero max-w-3xl'}
                            `}>
                        {isMobile
                            ? 'Construindo com Excelência'
                            : 'Construindo com Excelência, Uma história cada vez'
                        }
                    </h1>
                    <p className={`
                        text-off-white/80 mt-2 mb-6
                        ${isMobile ? 'text-body max-w-xs' : 'text-h2 max-w-xl'}
                        `}>
                        Serviços de construção e engenharia para clientes visionários.
                    </p>
                    <Button text="Explore nossos projetos" type={ButtonType.Secondary} className={isMobile ? "px-4 py-2 text-label text-cream" : "px-10 py-4 text-h3 text-cream"} />
                </div>
            </div>
        </section>
    )
}