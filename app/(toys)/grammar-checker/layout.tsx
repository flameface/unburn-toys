import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Grammar Checker | Toys',
    description: 'Check and fix grammar and spelling errors.',
    openGraph: {
        images: "https://raw.githubusercontent.com/unburn/assets/main/toys/unburn-toys.png"
    },
    publisher: "Unburn",
    twitter: {
        card: "summary_large_image",
        title: "Grammar Checker | Toys",
        description: "Check and fix grammar and spelling errors.",
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