import { tw } from "@/lib/tailwind";
import { Close, ErrorAlert, InfoAlert, SuccessAlert, WarningAlert } from "../assets/Icons";


export const AlertMessageType = {
    INFO: "info",
    WARNING: "warning",
    SUCCESS: "success",
    ERROR: "error",
} as const;

export type AlertMessageType = (typeof AlertMessageType)[keyof typeof AlertMessageType];

const ALERT_ICON_SIZE = 20;

const variants: Record<AlertMessageType, { container: string; title: string; icon: string }> = {
    info:    { container: "bg-[#F0F4F8] border-l-4 border-l-[#5B8DB8]", title: "text-[#2E5A7A]", icon: "color-[#5B8DB8]" },
    warning: { container: "bg-[#FDF6EC] border-l-4 border-l-[#D4A96A]", title: "text-[#8A6220]", icon: "color-[#D4A96A]" },
    success: { container: "bg-[#F0F5F0] border-l-4 border-l-[#5A8A5A]", title: "text-[#2E5A2E]", icon: "color-[#5A8A5A]" },
    error:   { container: "bg-[#FAF0EE] border-l-4 border-l-[#B85B5B]", title: "text-[#7A2E2E]", icon: "color-[#B85B5B]" },
};

const alertIcons: Record<AlertMessageType, React.ReactNode> = {
    [AlertMessageType.INFO]: <InfoAlert width={ALERT_ICON_SIZE} height={ALERT_ICON_SIZE} />,
    [AlertMessageType.WARNING]: <WarningAlert width={ALERT_ICON_SIZE} height={ALERT_ICON_SIZE} />,
    [AlertMessageType.SUCCESS]: <SuccessAlert width={ALERT_ICON_SIZE} height={ALERT_ICON_SIZE} />,
    [AlertMessageType.ERROR]: <ErrorAlert width={ALERT_ICON_SIZE} height={ALERT_ICON_SIZE} />,
};

interface AlertMessageProps {
    type: AlertMessageType;
    icon?: React.ReactNode;
    title: string;
    message: string;
    onClose?: () => void;
    className?: string;
}

export function AlertMessage({ type, icon, title, message, onClose, className = "" }: AlertMessageProps) {
    const variant = variants[type];
    const resolvedIcon = icon ?? alertIcons[type];

    return (
        <div
            role="alert"
            aria-live="polite"
            className={tw("flex items-start gap-3 rounded-lg px-4 py-3 shadow-sm", variant.container, className)}
        >
            <span className={tw("mt-0.5 shrink-0", variant.icon)}>
                {resolvedIcon}
            </span>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
                <p className={tw("font-family-primary font-bold text-sm-custom", variant.title)}>
                    {title}
                </p>
                <p className="font-family-primary text-sm-custom text-[#474741]">
                    {message}
                </p>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    aria-label="Fechar alerta"
                    className="shrink-0 mt-0.5 text-text-muted hover:text-charcoal transition-colors duration-200 cursor-pointer"
                >
                    <Close width={16} height={16} />
                </button>
            )}
        </div>
    );
}