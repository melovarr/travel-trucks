import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header/Header';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Travel Trucks',
  description: 'App for managing travel trucks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={interSans.variable}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
