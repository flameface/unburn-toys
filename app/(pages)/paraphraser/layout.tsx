import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Paraphraser | Unburn Toys",
    description: " paraphraser rewrites text in different words while preserving the original meaning.",
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
