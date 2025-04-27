import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  latitude: number;
  longitude: number;
}

const CustomMap: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Inisialisasi peta jika belum ada
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], 15);

      // Tambahkan layer OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);

      // Buat marker kustom dengan logo WMS
      const customIcon = L.icon({
        iconUrl: '/svgs/wms-logo.svg', // Pastikan path ini benar
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
      });

      // Tambahkan marker dengan icon kustom
      const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(mapInstanceRef.current);
      
      // Tambahkan popup untuk informasi
      marker.bindPopup('<b>PT. Wahana Makmur Sentosa</b><br>Aspal dan Beton').openPopup();
      
      // Event handler saat marker diklik
      marker.on('click', () => {
        // Buka Google Maps di tab baru
        window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
      });
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default CustomMap; 