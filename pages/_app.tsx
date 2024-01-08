import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Sans_Display } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react";
import {AuthContext} from "@/components/AuthContext";
import React from "react";

const font = Noto_Sans_Display ({
  subsets: ['latin'],
  variable: '--font-font'
});

export default function App({ Component, pageProps }: AppProps) {
  const [isSignInOpen, setIsSignInOpen] = React.useState<boolean>(true);
  const [isUserSignedIn, setIsUserSignedIn] = React.useState<boolean>(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState<boolean>(false);

  return (
    <AuthContext.Provider value={{isSignInOpen, setIsSignInOpen, isUserSignedIn, setIsUserSignedIn, isSignUpOpen, setIsSignUpOpen}}>
      <main className={`${font.className} font-semibold`}>
        <SpeedInsights/>
        <Analytics/>
        <Component {...pageProps} />
      </main>
    </AuthContext.Provider>
  )
}
