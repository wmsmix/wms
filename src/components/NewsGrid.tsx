import React from "react";
import NewsCard from "./NewsCard";

const news = [
  {
    title: "Jalan Ringroad Tuban Siap Dilewati untuk Arus Mudik Lebaran",
    date: "03",
    month: "APR",
    imageSrc: "/images/img-kabar-proyek-1.png",
    description: "Setelah dilaporkan tuntas, jalan lingkar selatan (JLS) Tuban mulai diaktifkan secara...",
    url: "/news/jalan-ringroad-tuban"
  },
  {
    title: "Ring Road Tuban Jadi Opsi Pengendara Kena Macet",
    date: "20",
    month: "MEI",
    imageSrc: "/images/img-kabar-proyek-2.png",
    description: "KBRN, Tuban: Setelah diresmikan, Ring Road/Jalur Lingkar Selatan Tuban yang berjalan ",
    url: "/news/wms-penghargaan-2023"
  },
  {
    title: "Jalan Lingkar Selatan Tuban Mulai Diaktifkan Terbatas: Kendaraan",
    date: "30",
    month: "JUNI",
    imageSrc: "/images/img-kabar-proyek-3.png",
    description: "KBRN, Tuban : Kapolres Tuban AKBP Suryono mengatakan bahwa dirinya sempat ",
    url: "/news/jembatan-kali-lamong"
  }
];

const NewsGrid: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-center gap-8">
        {news.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            date={item.date}
            month={item.month}
            imageSrc={item.imageSrc}
            description={item.description}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid; 