import { Close } from "@/shared/assets/Icons";
import { Button, ButtonType } from "@/shared/components/Button";
import Link from "@/shared/components/Link";

interface MobileMenuProps {
    onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
    return (
        <div className="flex z-3 absolute top-0 left-0 pt-6 w-screen h-screen bg-off-white">
            <section className="max-w-170 mx-auto flex flex-col gap-3 justify-center items-around">
                <button className="absolute top-4 right-3 p-0.5" onClick={onClose} >
                    <Close width={24} height={24} />
                </button>
                <ul className="flex flex-col gap-6 items-center">
                    <Link text="Serviços" href="#services" onClick={onClose} className="text-h3" />
                    <Link text="Empreendimentos" href="#portfolio" onClick={onClose} className="text-h3" />
                    <Link text="Contato" href="#contact" onClick={onClose} className="text-h3" />
                </ul>
                <Button text={"Agendar Visita"} type={ButtonType.Primary} />
            </section>
        </div>
    )
}