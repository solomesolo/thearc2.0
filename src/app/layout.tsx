import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./mobile-responsive.css";
import "../styles/theme.css";
import Footer from "../components/Footer";
import MainLayoutClient from "../components/MainLayoutClient";
import Header from "../components/Header";
import { Analytics } from "@vercel/analytics/next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import CookieConsent from "../components/CookieConsent";
import MixPanelProvider from "../components/MixPanelProvider";
import ConditionalHeaderFooter from "../components/ConditionalHeaderFooter";
import { ThemeProvider } from "../theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TheArc - Longevity System & Health Screening",
  description: "A private longevity circle guided by science, precision, and deep personalization. Built around you. Evolving with you.",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC - Set theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        
        {/* Google Tag Manager */}
        <script
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
        
        {/* Google Ads Conversion Tracking (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17631760134"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17631760134');
            `,
          }}
        />
        
        <meta name="theme-color" content="#FFFFFF" />
      </head>
      <body className={`${montserrat.variable} font-montserrat antialiased min-h-screen flex flex-col`} style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
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
        
        <ThemeProvider defaultTheme="light">
          <MixPanelProvider />
          <ConditionalHeaderFooter>
            <Header />
          </ConditionalHeaderFooter>
          <MainLayoutClient>
            {children}
          </MainLayoutClient>
          <ConditionalHeaderFooter>
            <Footer />
          </ConditionalHeaderFooter>
          <CookieConsent />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
