import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Caption Generator | Unburn Toys",
    description: "Generate caption from image for instagram, whatsapp and more.",
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
