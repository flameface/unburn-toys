import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Paraphraser | Toys',
    description: 'Rephrase sentence or paragraph in different words without changing meaning.',
    openGraph: {
        images: "https://raw.githubusercontent.com/unburn/assets/main/toys/unburn-toys.png"
    },
    publisher: "Unburn",
    twitter: {
        card: "summary_large_image",
        title: "Paraphraser | Toys",
        description: "Rephrase sentence or paragraph in different words without changing meaning.",
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