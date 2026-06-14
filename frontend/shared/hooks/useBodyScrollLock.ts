'use client';

import { useEffect } from "react";

export function useBodyScrollLock(locked: boolean) {
    useEffect(() => {
        const html = document.documentElement;
        html.style.overflow = locked ? "hidden" : "";

        return () => {
            html.style.overflow = "";
        };
    }, [locked]);
}