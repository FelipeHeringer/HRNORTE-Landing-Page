import Link from "@/shared/components/Link";

export function Navbar() {
    return (
        <nav>
            <ul className="flex space-x-5">
                <Link text="Empreendimentos" href="#portfolio"/>
                <Link text="Serviços" href="#services"/>
                <Link text="Contato" href="#contact"/>
            </ul>
        </nav>
    );
}