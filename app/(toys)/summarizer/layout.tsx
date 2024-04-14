import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Summarizer | Toys',
    description: 'Summarize paragraphs & sentences in proper simplest format.',
    openGraph: {
        images: "https://raw.githubusercontent.com/unburn/assets/main/toys/unburn-toys.png"
    },
    publisher: "Unburn",
    twitter: {
        card: "summary_large_image",
        title: "Summarizer | Toys",
        description: "Summarize paragraphs & sentences in proper simplest format.",
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