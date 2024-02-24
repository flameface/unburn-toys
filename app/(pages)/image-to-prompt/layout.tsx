import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image to Prompt | Unburn Toys",
    description: "Image to Prompt generates an enhanced, suitable prompt from the image.",
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
