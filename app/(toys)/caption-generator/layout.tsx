import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Caption Generator | Toys',
    description: 'Generate caption for Instagram and more from image and can generate human-like captions for any image.',
    openGraph: {
        images: "/unburn-toys.png"
    },
    publisher: "Unburn",
    twitter: {
        card: "summary_large_image",
        title: "Caption Generator | Toys",
        description: "Generate caption for Instagram and more from image and can generate human-like captions for any image.",
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