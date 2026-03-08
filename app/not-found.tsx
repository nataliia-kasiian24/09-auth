import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'Sorry, the page you are looking for does not exist on NoteHub.',
  openGraph: {
    title: '404 - Page Not Found',
    description: 'The requested page was not found.',
    url: 'https://08-zustand-rose-eta.vercel.app/404',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}