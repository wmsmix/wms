import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Interface for page content structure
interface PageHero {
  title?: string;
}

interface PageContent {
  hero?: PageHero;
}

interface PageContentRow {
  content: PageContent;
}

// Interface for product names used in navigation
export interface ProductName {
  key: string;
  title: string;
  href: string;
}

// Get dynamic product names from the database
export async function getProductNames(): Promise<ProductName[]> {
  const productNames: ProductName[] = [];

  try {
    // Get Aspal name
    const { data: aspalData } = await supabase
      .from('aspal_page_content')
      .select('content')
      .order('id', { ascending: false })
      .limit(1)
      .single();

    const aspalContent = aspalData as PageContentRow | null;
    if (aspalContent?.content?.hero?.title) {
      productNames.push({
        key: 'aspal',
        title: aspalContent.content.hero.title.toUpperCase(),
        href: '/products/aspal'
      });
    }

    // Get Beton name
    const { data: betonData } = await supabase
      .from('beton_page_content')
      .select('content')
      .order('id', { ascending: false })
      .limit(1)
      .single();

    const betonContent = betonData as PageContentRow | null;
    if (betonContent?.content?.hero?.title) {
      productNames.push({
        key: 'beton',
        title: betonContent.content.hero.title.toUpperCase(),
        href: '/products/beton'
      });
    }

    // Get Precast Concrete name
    const { data: precastData } = await supabase
      .from('precast_page_content')
      .select('content')
      .order('id', { ascending: false })
      .limit(1)
      .single();

    const precastContent = precastData as PageContentRow | null;
    if (precastContent?.content?.hero?.title) {
      productNames.push({
        key: 'precast',
        title: precastContent.content.hero.title,
        href: '/products/precast-concrete'
      });
    }

    return productNames;
  } catch (error) {
    console.error('Error fetching product names:', error);

    // Return fallback names if database fetch fails
    return [
      {
        key: 'aspal',
        title: 'ASPAL',
        href: '/products/aspal'
      },
      {
        key: 'beton',
        title: 'BETON',
        href: '/products/beton'
      },
      {
        key: 'precast',
        title: 'PRECAST CONCRETE',
        href: '/products/precast-concrete'
      }
    ];
  }
}
