import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Summarizer | Unburn Toys",
    description: "A summarizer condenses text into shorter summaries while preserving key information.",
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
