import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';
import { TanStackProvider } from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub - Your Personal Notes',
  description: 'NoteHub is the best place to organize your thoughts and tasks.',
  openGraph: {
    title: 'NoteHub - Your Personal Notes',
    description:
      'NoteHub is the best place to organize your thoughts and tasks.',
    url: 'https://08-zustand-rose-eta.vercel.app/',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
  modal, 
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}> 
      <body>
        <TanStackProvider> 
          <AuthProvider> 
            <Header /> 
            <main>
              {children}
              {modal} 
            </main>
            <Footer /> 
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
