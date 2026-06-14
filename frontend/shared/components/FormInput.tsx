'use client'

import { forwardRef, useImperativeHandle, useState } from "react"

interface InputProps {
    placeholder: string,
    type: string,
}

export interface FormInputRef {
    getValue: () => string;
    clear: () => void;
}

export const FormInput = forwardRef<FormInputRef, InputProps>(
    ({ placeholder, type }, ref) => {
        const [value, setvalue] = useState("")

        useImperativeHandle(ref, () => ({
            getValue: () => value,
            clear: () => setvalue(""),
        }))

        return (
            <input className="bg-off-white rounded-lg py-[14px] px-4 shadow-sm font-family-primary" placeholder={placeholder} type={type} value={value} onChange={e => setvalue(e.target.value)} ></input>
        )
    }
)