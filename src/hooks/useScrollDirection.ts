import { useState, useEffect } from "react";
import React from "react";

export function useScrollDirection() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Penting: gunakan ref untuk menghindari infinite loop
  const throttleTimeout = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (throttleTimeout.current) {
        return;
      }

      throttleTimeout.current = setTimeout(() => {
        const currentScrollPos = window.scrollY;
        
        // Selalu tampilkan navbar di atas halaman
        if (currentScrollPos < 10) {
          setVisible(true);
        } 
        // Jika scroll down, sembunyikan navbar
        else if (currentScrollPos > prevScrollPos) {
          setVisible(false);
        } 
        // Jika scroll up, tampilkan navbar
        else {
          setVisible(true);
        }
        
        setPrevScrollPos(currentScrollPos);
        throttleTimeout.current = null;
      }, 100); // Throttle untuk performa
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [prevScrollPos]);

  return { visible };
}