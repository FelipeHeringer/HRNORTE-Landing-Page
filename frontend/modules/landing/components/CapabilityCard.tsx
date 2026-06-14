interface CapabilityProps {
    id: number,
    title: string,
    description: string
    icon: React.ReactNode
}

export function CapabilityCard({ id, title, description, icon }: CapabilityProps) {
    return (
        <div className="flex flex-col gap-6 px-8 py-8 rounded-lg bg-[#F7F3F1] shadow-sm">
            <div className="flex justify-between items-center">
                <h3 className="font-family-primary font-light text-[#C8C7BF] text-[24px]">0{id}</h3>
                {icon}
            </div>
            <div className="flex flex-col gap-[11px]">
                <h3 className="font-family-primary font-bold text-charcoal text-h3">{title}</h3>
                <p className="font-family-primary text-charcoal text-body">{description}</p>
            </div>
        </div>
    )
}