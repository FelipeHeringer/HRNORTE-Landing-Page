import { tw } from "@/lib/tailwind";
import type { HTMLProps } from "react";

export const ButtonType = {
    Primary: "primary",
    Secondary: "secondary",
    Tertiary: "tertiary",
} as const;

export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

interface ButtonProps {
    text: string;
    type: ButtonType;
    onClick?: () => void;
    className?: HTMLProps<HTMLAnchorElement>["className"];
    disabled?: boolean;
}

export function Button({ text, type, className = "", onClick, disabled = false }: ButtonProps) {
    return (
        type === ButtonType.Primary ? (
            <button type="button"
                onClick={onClick}
                disabled={disabled}
                className={tw("relative group px-6 py-2 border border-gold-light rounded-pill overflow-hidden text-size-body disabled:opacity-50 disabled:cursor-not-allowed", className)}>
                <span className="
                    absolute inset-0
                    bg-gold-light
                    scale-x-0
                    group-hover:scale-x-100
                    transition-transform duration-450 ease-in-out
                    origin-left
                    -z-10
                "></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 text-size-body">
                    {text}
                </span>
            </button>
        ) : type === ButtonType.Secondary ? (
            <button type="button"
                onClick={onClick}
                disabled={disabled}
                className={tw("bg-gold-light rounded-pill hover:bg-charcoal font-bold disabled:opacity-50 disabled:cursor-not-allowed", className)}>
                {text}
            </button>
        ) : (
            <button type="button"
                onClick={onClick}
                disabled={disabled}
                className={tw("bg-[#795920] py-4 rounded-lg shadow-sm text-off-white text-body font-bold font-family-primary hover:bg-[#5C4118] disabled:opacity-50 disabled:cursor-not-allowed", className)}>
                {text}
            </button>
        )
    );
}