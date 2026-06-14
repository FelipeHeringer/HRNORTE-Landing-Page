'use client'

import { useEffect, useRef, useState } from 'react';
import { AlertMessageType } from '@/shared/components/AlertMessage';
import type { FormInputRef }    from '@/shared/components/FormInput';
import type { FormDropDownRef } from '@/shared/components/FormDropdown';
import type { FormTextAreaRef } from '@/shared/components/FormTextArea';

export type SubmitStatus =
    | { state: 'idle' }
    | { state: 'loading' }
    | { state: 'success'; title: string; message: string }
    | { state: 'error'; type: AlertMessageType; title: string; message: string };


export interface ContactFormViewModel {
    // Refs — the View attaches these to <FormInput ref={fullNameRef} />
    fullNameRef: React.RefObject<FormInputRef | null>;
    emailRef:    React.RefObject<FormInputRef | null>;
    subjectRef:  React.RefObject<FormDropDownRef | null>;
    messageRef:  React.RefObject<FormTextAreaRef | null>;

    // State
    status: SubmitStatus;

    // Actions
    handleSubmit: () => void;    // safe to call from onClick or onSubmit
    dismiss:      () => void;    // dismisses the alert immediately
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useContactForm(): ContactFormViewModel {

    // ── Refs (moved from ContactInformationSection) ───────────────────────────
    const fullNameRef = useRef<FormInputRef>(null);
    const emailRef    = useRef<FormInputRef>(null);
    const subjectRef  = useRef<FormDropDownRef>(null);
    const messageRef  = useRef<FormTextAreaRef>(null);

    // ── Network state ─────────────────────────────────────────────────────────
    const [status, setStatus] = useState<SubmitStatus>({ state: 'idle' });

    // ── Auto-dismiss after 4 s ────────────────────────────────────────────────
    useEffect(() => {
        if (status.state !== 'success' && status.state !== 'error') return;

        const timer = setTimeout(() => setStatus({ state: 'idle' }), 4000);
        return () => clearTimeout(timer);
    }, [status.state]);

    // ── Helpers ───────────────────────────────────────────────────────────────

    function clearFields() {
        fullNameRef.current?.clear();
        emailRef.current?.clear();
        subjectRef.current?.clear();
        messageRef.current?.clear();
    }

    function dismiss() {
        setStatus({ state: 'idle' });
    }

    async function submit() {
        setStatus({ state: 'loading' });

        const fields = {
            fullName: fullNameRef.current?.getValue() ?? '',
            email:    emailRef.current?.getValue()    ?? '',
            subject:  subjectRef.current?.getValue()  ?? '',
            message:  messageRef.current?.getValue()  ?? '',
        };

        try {
            const response = await fetch('/api/contact', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(fields),
            });

            const data = await response.json().catch(() => ({})) as { error?: string };

            if (response.ok) {
                clearFields();
                setStatus({
                    state:   'success',
                    title:   'Mensagem enviada!',
                    message: 'Entraremos em contato em breve.',
                });
                return;
            }

            if (response.status === 422) {
                setStatus({
                    state:   'error',
                    type:    AlertMessageType.WARNING,
                    title:   'Campos inválidos',
                    message: data.error ?? 'Verifique os campos e tente novamente.',
                });
                return;
            }

            setStatus({
                state:   'error',
                type:    AlertMessageType.ERROR,
                title:   'Falha no envio',
                message: data.error ?? 'Ocorreu um erro. Tente novamente mais tarde.',
            });

        } catch {
            setStatus({
                state:   'error',
                type:    AlertMessageType.ERROR,
                title:   'Sem conexão',
                message: 'Verifique sua internet e tente novamente.',
            });
        }
    }

    function handleSubmit() {
        void submit();
    }

    return { fullNameRef, emailRef, subjectRef, messageRef, status, handleSubmit, dismiss };
}