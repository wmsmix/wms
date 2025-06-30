import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Titillium_Web, Noto_Serif } from "next/font/google";
import { type Metadata } from "next";
import { SmoothScrollProvider } from "~/contexts/SmoothScrollContext";
import SmoothScrollAnchor from "~/components/SmoothScrollAnchor";
import ConditionalWhatsAppButton from "~/components/commons/ConditionalWhatsAppButton";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "WMS - PT. Wahana Makmur Sentosa",
  description: "WMS",
  icons: [{ rel: "icon", url: "/wms-logo.svg" }],
};

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-titillium-web",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${titilliumWeb.variable} ${notoSerif.variable}`}
    >
      <head>
           {/* Define isSpace function globally to fix markdown-it issues with Next.js + Turbopack */}
           <Script id="markdown-it-fix" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined' && typeof window.isSpace === 'undefined') {
              window.isSpace = function(code) {
                return code === 0x20 || code === 0x09 || code === 0x0A || code === 0x0B || code === 0x0C || code === 0x0D;
              };
            }
          `}
        </Script>
      </head>
      <body>
        <SmoothScrollProvider>
          {children}
          <SmoothScrollAnchor />
        </SmoothScrollProvider>
        <ConditionalWhatsAppButton />
      </body>
    </html>
  );
}
