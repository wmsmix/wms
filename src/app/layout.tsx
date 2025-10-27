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

// VVV BAGIAN 1: "BAHAN" (OBJEK DATA SCHEMA) DITARUH DI SINI VVV
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "PT Wahana Makmur Sentosa",
  "alternateName": "WMS Mix",
  "description": "Pilihan Ahli Konstruksi. Supplier aspal hotmix, readymix, dan beton precast terpercaya di Indonesia. Bagian dari Restu Mulia Construction Group.",
  "url": "https://wmsmix.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://wmsmix.com/svgs/wms-logo.svg"
  },
  "telephone": "+6282337900700",
  "email": "halo@wmsmix.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Penidon I, Magersari, Plumpang",
    "addressLocality": "Tuban Regency",
    "addressRegion": "East Java",
    "postalCode": "62382",
    "addressCountry": "ID"
  },
  "parentOrganization": {
    "@type": "Organization",
    "name": "Restu Mulia Construction Group"
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Aspal Hotmix"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Beton Readymix"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Beton Precast"
      }
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/pt-wahana-makmur-sentosa",
    "https://www.facebook.com/profile.php?id=61571593506561",
    "https://www.instagram.com/wms.mix/",
    "https://www.tiktok.com/@wmsmix"
  ]
};

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
        {/* Script yang lama bisa dibiarkan saja */}
        
        {/* VVV BAGIAN 2: "MEMBUAT KUE" (TAG SCRIPT) DITARUH DI DALAM RETURN VVV */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
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
