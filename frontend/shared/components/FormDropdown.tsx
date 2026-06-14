'use client'

import { forwardRef, useImperativeHandle, useState } from "react";

interface DropdownProps {
    icon?: React.ReactNode;
    values: string[];
    placeholder?: string;
}

export interface FormDropDownRef {
    getValue: () => string;
    clear: () => void;
}

export const FormDropDown = forwardRef<FormDropDownRef, DropdownProps>(function FormDropDown(
    { icon, values, placeholder = "Selecione" },
    ref
) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
        getValue: () => selected ?? "",
        clear: () => setSelected("Selecione"),
    }));

    return (
        <div className="relative w-full">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full flex items-center justify-between bg-off-white rounded-lg py-[14px] px-4 shadow-sm text-charcoal font-family-primary text-body"
            >
                <span>{selected ?? placeholder}</span>
                {icon}
            </button>

            {/* Options */}
            {open && (
                <ul className="absolute z-10 w-full mt-1 bg-off-white rounded-lg shadow-md overflow-hidden">
                    {values.map((value) => (

                        <li
                            key={value}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelected(value);
                                setOpen(false);
                            }}
                            className={"px-4 py-3 text-body font-family-primary cursor-pointer transition-colors hover:bg-cream text-charcoal"}
                        >
                            {value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});