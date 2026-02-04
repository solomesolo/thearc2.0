import type { Metadata } from "next";
import "./globals.css";
import "./mobile-responsive.css";
import { Analytics } from "@vercel/analytics/next";
import { Newsreader, Inter } from "next/font/google";
import Script from "next/script";
import CookieConsent from "../components/CookieConsent";
import MixPanelProvider from "../components/MixPanelProvider";
import MarketingLayoutWrapper from "../components/MarketingLayoutWrapper";

// Premium type pairing: Clinical luxury
// Headline serif: Newsreader (clinical luxury)
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

// UI/body sans: Inter
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "TheArc - Longevity System & Health Screening",
  description: "A private longevity circle guided by science, precision, and deep personalization. Built around you. Evolving with you.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${newsreader.variable} ${inter.variable} font-sans antialiased bg-black text-white min-h-screen flex flex-col`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-MJ4KKD9N"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {/* Deferred analytics scripts */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MJ4KKD9N');
            `,
          }}
        />
        
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17631760134"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17631760134');
            `,
          }}
        />

        <MixPanelProvider />
        <MarketingLayoutWrapper>
          {children}
        </MarketingLayoutWrapper>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
