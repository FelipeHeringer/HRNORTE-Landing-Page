import { extendTailwindMerge } from "tailwind-merge";

export const tw = extendTailwindMerge({
    extend: {
        classGroups: {
            "font-size": [
                "text-hero",
                "text-h1",
                "text-h2",
                "text-h3",
                "text-body",
                "text-sm-custom",
                "text-label",
            ],
        },
    },
});