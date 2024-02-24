import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Grammar Checker | Unburn Toys",
    description: "An image prompt enhancer improves image-based prompts by adding context or guidance.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}