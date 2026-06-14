'use client'

import { useEffect, useState } from "react";
import { AlertMessageType } from "@/shared/components/AlertMessage";

export type SubmitStatus =
    | { state: "idle" }
    | { state: "loading" }
    | { state: "success"; title: string; message: string }
    | { state: "error"; type: AlertMessageType; title: string; message: string };


export function useContactForm(onSuccess?: () => void) {
    const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });

    useEffect(() => {
        if (status.state !== "success" && status.state !== "error") return;

        const timer = setTimeout(() => {
            setStatus({ state: "idle" });
        }, 4000);

        return () => clearTimeout(timer);
    }, [status.state]);

    function dismiss() {
        setStatus({ state: "idle" });
    }

    async function submit(fields: {
        fullName?: string;
        email?: string;
        subject?: string;
        message?: string;
    }) {
        setStatus({ state: "loading" });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fields),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                onSuccess?.();
                setStatus({
                    state: "success",
                    title: "Mensagem enviada!",
                    message: "Entraremos em contato em breve.",
                });
                return;
            }

            if (response.status === 422) {
                setStatus({
                    state: "error",
                    type: AlertMessageType.WARNING,
                    title: "Campos inválidos",
                    message: data.error ?? "Verifique os campos e tente novamente.",
                });
                return;
            }

            setStatus({
                state: "error",
                type: AlertMessageType.ERROR,
                title: "Falha no envio",
                message: data.error ?? "Ocorreu um erro. Tente novamente mais tarde.",
            });

        } catch {
            setStatus({
                state: "error",
                type: AlertMessageType.ERROR,
                title: "Sem conexão",
                message: "Verifique sua internet e tente novamente.",
            });
        }
    }

    return { status, submit, dismiss };
}