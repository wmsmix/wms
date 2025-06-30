"use client";

import { usePathname } from 'next/navigation';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

const ConditionalWhatsAppButton = () => {
  const pathname = usePathname();

  // Don't render WhatsApp button in CMS routes
  if (pathname?.startsWith('/cms')) {
    return null;
  }

  return (
    <FloatingWhatsAppButton
      message="Halo, saya tertarik dengan produk WMS"
      position="bottom-right"
    />
  );
};

export default ConditionalWhatsAppButton;
