import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Fredoka } from 'next/font/google'

const font = Fredoka({
  subsets: ['latin'],
  variable: '--font-font'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${font.className} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
