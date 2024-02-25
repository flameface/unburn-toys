import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password Generator | Unburn Toys",
    description: "A simple password generator which uses ai to create strong passwords",
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
