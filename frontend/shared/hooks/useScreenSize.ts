'use client';

import { useEffect, useState } from "react";

export function useScreenSize(): 'mobile' | 'desktop' {
    const [size, setSize] = useState<'mobile' | 'desktop'>('desktop');

    useEffect(() => {
        function handleResize() {
            setSize(window.innerWidth < 768 ? 'mobile' : 'desktop');
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return size;
}