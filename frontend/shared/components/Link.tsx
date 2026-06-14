import type { HTMLProps } from "react";
import { tw } from '@/lib/tailwind';

interface LinkProps {
    text: string;
    href?: string;
    className?: HTMLProps<HTMLAnchorElement>["className"];
    onClick?: () => void;
}

export default function Link({ text, href = "", className = "", onClick }: LinkProps) {
    return (
        <li >
            <a href={href} onClick={onClick} className={tw("relative inline-block group font-family-primary text-text-secondary", className)}>
                {text}
                <span className="
                            absolute bottom-0 left-0
                            w-full h-[2px]
                            bg-current
                            scale-x-0
                            group-hover:scale-x-100
                            transition-transform duration-300 ease-in-out
                            origin-left
                        "></span>
            </a>
        </li>
    )
}