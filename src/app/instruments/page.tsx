"use client";

import { Suspense } from "react";
import InstrumentsList from "~/components/InstrumentsList";
import Navbar from "~/components/commons/Navbar";
import Footer from "~/components/commons/Footer";

export default function InstrumentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black font-titillium text-white-10">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-noto">Instruments</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            View all instruments from our Supabase database. This demonstrates the successful integration
            of Supabase with our Next.js application.
          </p>
        </div>
        
        <div 
          className="max-w-4xl mx-auto bg-white-10 p-6 rounded-lg"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 4%, 100% 100%, 92% 100%, 8% 100%, 0% 100%, 0% 4%)",
          }}
        >
          <Suspense fallback={
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }>
            <InstrumentsList />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 