interface DirectContactProps {
    icon: React.ReactNode,
    description: string,
}

export function DirectContact({icon, description}: DirectContactProps) {
    return (
        <div className="flex font-family-primary gap-3 items-center">
            {icon} <span className="text-[#858481] font-family-primary">{description}</span>
        </div>
    )
}