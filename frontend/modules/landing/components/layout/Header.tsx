'use client'

import { Logo, Menu } from "@/shared/assets/Icons";
import { Navbar } from "../Navbar";
import { Button, ButtonType } from "@/shared/components/Button";
import { useScreenSize } from "@/shared/hooks/useScreenSize";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";

export default function Header() {
    const [showMobileContent, setShowMobileContent] = useState(false);
    const screen = useScreenSize();
    useBodyScrollLock(showMobileContent);

    return (
        <div className="fixed top-0 w-full z-50 bg-off-white">
            {/* Mobile Header */}
            {screen === 'mobile' ? (
                <header className="flex py-4 px-3 justify-between items-center">
                    <Logo />
                    <button onClick={() => setShowMobileContent(true)}>
                        <Menu width={28} height={28} />
                    </button>
                </header>
            ) : (
                <header className="flex md:justify-between md:items-center md:py-4 md:px-3">
                    {/* Desktop Header */}
                    <Logo />
                    <Navbar />
                    <Button text="Agendar Visita" type={ButtonType.Primary} />
                </header>
            )}
            {showMobileContent && (
                <MobileMenu onClose={() => setShowMobileContent(false)} />
            )}
        </div >
    );
}