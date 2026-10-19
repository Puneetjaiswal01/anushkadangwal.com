import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Thank you for everything', description: 'A little note, with gratitude and warm wishes.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
