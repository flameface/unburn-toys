import { Providers } from "./providers";
import "@/app/globals.css"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://unburn.tech'),
  title: 'Toys - Everyday AI Tools',
  description: 'Empower your daily tasks with our versatile AI toolbox, delivering essential tools for every need.',
  openGraph: {
    images: "/unburn-toys.png"
  },
  publisher: "Unburn",
  twitter: {
    card: "summary_large_image",
    title: "Toys - Everyday AI Tools",
    description: "Empower your daily tasks with our versatile AI toolbox, delivering essential tools for every need.",
    images: "/unburn-toys.png"
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}