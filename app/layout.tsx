import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import '@styles/global.css';

export const metadata: Metadata = {
  title: {
    template: '%s | 쾌속',
    default: '쾌속 | 빠르고 간단한 메모',
  },
  description: '빠르고 간단한 메모',
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        url: '/favicon/favicon-96x96.png',
      },
    ],
    apple: [
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        url: '/favicon/apple-touch-icon-152x152.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicon/apple-touch-icon-180x180.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '240x240',
        url: '/favicon/apple-touch-icon-240x240.png',
      },
    ],
  },
  openGraph: {
    title: '쾌속',
    description: '빠르고 간단한 메모',
    url: 'https://kwaesok.pages.dev/',
    locale: 'ko_KR',
    type: 'website',
    siteName: '쾌속',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'standard',
      'max-snippet': -1,
    },
  },
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
      themeprovider
      navbar
      children
      footer
      Analytics
      SpeedInsights
    */
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
