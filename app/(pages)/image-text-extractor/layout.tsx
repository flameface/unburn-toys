import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Text Extractor | Unburn Toys",
    description: "Extract text from image in formated order.",
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
