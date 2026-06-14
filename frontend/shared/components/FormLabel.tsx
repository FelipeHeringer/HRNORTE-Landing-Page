interface LabelProps {
    title: string,
}

export function FormLabel({title}: LabelProps) {
    return (
        <p className="font-family-primary font-bold text-[#474741] text-sm-custom">{title}</p>
    )
}