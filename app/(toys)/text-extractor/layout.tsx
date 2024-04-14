import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Text Extractor | Toys',
    description: 'Extract text from image in proper format.',
    openGraph: {
        images: "https://raw.githubusercontent.com/unburn/assets/main/toys/unburn-toys.png"
    },
    publisher: "Unburn",
    twitter: {
        card: "summary_large_image",
        title: "Text Extractor | Toys",
        description: "Extract text from image in proper format.",
        images: "https://raw.githubusercontent.com/unburn/assets/main/toys/unburn-toys.png"
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}