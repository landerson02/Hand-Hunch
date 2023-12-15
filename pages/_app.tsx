import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Sans_Display } from 'next/font/google'

const font = Noto_Sans_Display ({
  subsets: ['latin'],
  variable: '--font-font'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${font.className} font-semibold`}>
      <Component {...pageProps} />
    </main>
  )
}
