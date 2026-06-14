interface InformartionProps {
    icon: React.ReactNode,
    title: string,
    description: string,
}

export function ContactInformation({icon, title, description}: InformartionProps) {

    return (
        <div className="flex gap-5">
            {icon}
            <div className="flex flex-col gap-1">
                <span className="font-family-primary font-bold text-body">{title}</span>
                <span className="font-family-primary text-[#474741]">{description}</span>
            </div>
        </div>
    )
}