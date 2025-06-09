import { createClient } from '@supabase/supabase-js';
import type { BetonPageContent } from '~/types/cms';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for database record
interface BetonContentRecord {
  id: number;
  content: BetonPageContent;
  created_at: string;
  updated_at: string;
}

export async function getBetonContentFromSupabase(): Promise<BetonPageContent> {
  try {
    const response = await supabase
      .from('beton_page_content')
      .select('content')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (response.error) {
      console.error('Error fetching beton content:', response.error);
      throw response.error;
    }

    const record = response.data as BetonContentRecord;
    return record.content;
  } catch (error) {
    console.error('Error in getBetonContentFromSupabase:', error);
    // Return default content structure if fetch fails
    return {
      hero: {
        title: "Beton (Ready-Mix)",
        description: "Tersedia beton dengan kekuatan tekan Fc' mulai dari 10 MPa hingga 30 MPa. Dimana setiap tipe dirancang untuk kebutuhan konstruksi spesifik, mulai dari pekerjaan ringan hingga proyek infrastruktur besar.",
        imageSrc: "/images/img-hero-beton.png",
        buttonText: "TANYA LEBIH LANJUT",
        buttonHref: "/contact"
      },
      nonStruktural: {
        title: "Beton Non-Struktural",
        description: "Beton dengan kekuatan tekan rendah hingga sedang, ideal untuk aplikasi non-struktural dan pekerjaan ringan.",
        products: []
      },
      struktural: {
        title: "Beton Struktural & Infrastruktur",
        description: "Beton dengan kekuatan tekan tinggi untuk aplikasi struktural dan proyek infrastruktur berat.",
        products: []
      },
      clippedSection: {
        title: "Campuran Aspal dan Beton Khusus",
        description: "Campuran aspal dan beton yang dirancang untuk efisiensi biaya tanpa mengurangi kualitas maupun spesifikasi proyek",
        buttonText: "PILIH PRODUK INI",
        buttonHref: "/contact"
      },
      insightsSectionTitle: "Lihat Insight Proyek"
    };
  }
}

export async function saveBetonContentToSupabase(content: BetonPageContent): Promise<boolean> {
  try {
    const response = await supabase
      .from('beton_page_content')
      .insert([
        {
          content: content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (response.error) {
      console.error('Error saving beton content:', response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in saveBetonContentToSupabase:', error);
    return false;
  }
}
