import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import ParticlesBackground from '@/components/ParticlesBackground';

export const metadata: Metadata = {
  title: 'NotifyHub | Smart Campus Communication',
  description: 'NotifyHub brings all campus announcements, events, and important updates to one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ParticlesBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
