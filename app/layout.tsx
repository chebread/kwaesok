import type { Metadata, Viewport } from 'next';
import '@styles/global.css';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    template: '%s | 쾌속',
    default: '쾌속 | 빠르고 간단한 메모',
  },
  description: '빠르고 간단한 메모',
  // icons: {
  //   icon: [
  //     {
  //       rel: 'icon',
  //       type: 'image/png',
  //       sizes: '16x16',
  //       url: '/favicon/favicon-16x16.png',
  //     },
  //     {
  //       rel: 'icon',
  //       type: 'image/png',
  //       sizes: '32x32',
  //       url: '/favicon/favicon-32x32.png',
  //     },
  //     {
  //       rel: 'icon',
  //       type: 'image/png',
  //       sizes: '96x96',
  //       url: '/favicon/favicon-96x96.png',
  //     },
  //   ],
  //   apple: [
  //     {
  //       rel: 'apple-touch-icon',
  //       sizes: '152x152',
  //       url: '/favicon/apple/apple-touch-icon-152x152.png',
  //     },
  //     {
  //       rel: 'apple-touch-icon',
  //       sizes: '180x180',
  //       url: '/favicon/apple/apple-touch-icon-180x180.png',
  //     },
  //     {
  //       rel: 'apple-touch-icon',
  //       sizes: '240x240',
  //       url: '/favicon/apple/apple-touch-icon-240x240.png',
  //     },
  //   ],
  // },
  openGraph: {
    title: '차한음 블로그',
    description: '차한음의 개인 기술 블로그',
    url: 'https://chebread.github.io/',
    locale: 'ko_KR',
    type: 'website',
    siteName: '차한음',
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
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
