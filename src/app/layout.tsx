import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Titillium_Web, Noto_Serif } from "next/font/google";
import { type Metadata } from "next";
import { SmoothScrollProvider } from "~/contexts/SmoothScrollContext";
import FloatingWhatsAppButton from "~/components/commons/FloatingWhatsAppButton";
import Script from "next/script";
import SmoothScrollAnchor from "~/components/SmoothScrollAnchor";

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
      <body>
        <SmoothScrollProvider>
          {children}
          <SmoothScrollAnchor />
        </SmoothScrollProvider>
        <FloatingWhatsAppButton
          message="Halo, saya tertarik dengan produk WMS"
          position="bottom-right"
        />
        {/* <Script id="smooth-scroll" strategy="afterInteractive">
          {`
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });

                  // Opsional: Update URL dengan hash
                  history.pushState(null, null, targetId);
                }
              });
            });
          `}
        </Script> */}
      </body>
    </html>
  );
}
