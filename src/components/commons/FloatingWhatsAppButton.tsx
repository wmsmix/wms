"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  position?: "bottom-left" | "bottom-right";
}

const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneNumber = "6282337900700",
  message = "Halo, saya tertarik dengan produk WMS",
  position = "bottom-right",
}) => {
  // Bersihkan nomor telepon dari karakter non-digit
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Pastikan nomor dimulai dengan kode negara Indonesia (62)
  const formattedNumber = cleanPhoneNumber.startsWith('62')
    ? cleanPhoneNumber
    : `62${cleanPhoneNumber.startsWith('0') ? cleanPhoneNumber.substring(1) : cleanPhoneNumber}`;

  // Buat URL WhatsApp dengan nomor dan pesan
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${encodeURIComponent(message)}`;

  // Tentukan posisi berdasarkan props
  const positionClass = {
    "bottom-left": "left-6 bottom-6",
    "bottom-right": "right-6 bottom-6",
  };

  const handleClick = (e: React.MouseEvent) => {
    console.log("Mencoba membuka WhatsApp dengan URL:", whatsappUrl);
    // Buka di tab baru jika pengguna menggunakan metode standar
    // Tetapi biarkan default behavior handle URL
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`fixed ${positionClass[position]} z-40 block transition duration-300 hover:opacity-80`}
    >
      <div className="whatsapp-button">
        <div className="whatsapp-button-inner">
          <FontAwesomeIcon icon={faWhatsapp} className="text-[20px] md:text-[28px] text-[#ffffff]" />
        </div>
      </div>

      <style jsx>{`
        .whatsapp-button {
          position: relative;
          width: 52px;  /* ukuran default untuk mobile */
          height: 46px; /* ukuran default untuk mobile */
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(12% 0%, 88% 0%, 100% 16%, 100% 84%, 88% 100%, 12% 100%, 0% 84%, 0% 16%);
          background-color: #FFFFFF;
        }

        .whatsapp-button-inner {
          position: relative;
          width: calc(52px - 2px);  /* ukuran default untuk mobile */
          height: calc(46px - 2px); /* ukuran default untuk mobile */
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(12% 0%, 88% 0%, 100% 16%, 100% 84%, 88% 100%, 12% 100%, 0% 84%, 0% 16%);
          background-color: #FF7028;
          margin: 1px;
        }

        @media (min-width: 768px) {
          .whatsapp-button {
            width: 68px;
            height: 60px;
          }

          .whatsapp-button-inner {
            width: calc(68px - 2px);
            height: calc(60px - 2px);
          }
        }
      `}</style>
    </a>
  );
};

export default FloatingWhatsAppButton;
