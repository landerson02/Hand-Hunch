import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Sans_Display } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react";

const font = Noto_Sans_Display ({
  subsets: ['latin'],
  variable: '--font-font'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${font.className} font-semibold`}>
      <SpeedInsights />
      <Analytics />
      <Component {...pageProps} />
    </main>
  )
}
