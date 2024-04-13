import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Image to Prompt | Toys',
    description: 'Generate enhanced prompt from image.',
    openGraph: {
        images: "/unburn-toys.png"
    },
    publisher: "Unburn",
    twitter: {
        card: "summary_large_image",
        title: "Image to Prompt | Toys",
        description: "Generate enhanced prompt from image.",
        images: "/unburn-toys.png"
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}