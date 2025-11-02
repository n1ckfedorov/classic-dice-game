import type { Metadata } from 'next';
import { Sprite } from '@/components/Sprite';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Classic Dice Game',
  description: 'A dice game with a modern web interface.',
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Sprite />
        {props.children}
      </body>
    </html>
  );
}
