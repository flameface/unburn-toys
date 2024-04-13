import { extendVariants, Select, Textarea } from "@nextui-org/react";

export const TextArea = extendVariants(Textarea, {
    variants: {
        color: {
            default: {
                inputWrapper: [
                    "bg-default-50",
                    "data-[hover=true]:bg-default-100"
                ]
            }
        }
    }
});

export const SelectMenu = extendVariants(Select, {
    variants: {
        color: {
            default: {
                trigger: [
                    "bg-default-50",
                    "data-[hover=true]:bg-default-100"
                ]
            }
        }
    }
})