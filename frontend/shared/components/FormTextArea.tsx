'use client'

import { forwardRef, useImperativeHandle, useState } from "react"

interface TextAreaProps {
    rows: number,
    placeholder: string,
}

export interface FormTextAreaRef {
    getValue: () => string;
    clear: () => void;
}

export const FormTextArea = forwardRef<FormTextAreaRef, TextAreaProps>(function FormTextArea(
    { rows, placeholder },
    ref
) {
    const [value, setValue] = useState("");

    useImperativeHandle(ref, () => ({
        getValue: () => value,
        clear: () => setValue(""),
    }));

    return (
        <textarea className="bg-off-white rounded-lg py-[14px] px-4 shadow-sm resize-none font-family-primary" placeholder={placeholder} rows={rows} value={value} onChange={e => setValue(e.target.value)}></textarea>
    )
});