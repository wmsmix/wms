import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Verify session and get user
async function getSessionUser() {
  const cookieStore = cookies();
  const cmsSessionCookie = cookieStore.get('cms_session');

  if (!cmsSessionCookie?.value) {
    return null;
  }

  try {
    const userData = JSON.parse(cmsSessionCookie.value);
    return userData;
  } catch (e) {
    return null;
  }
}

type RouteParams = {
  params: {
    slug: string;
  }
}

// GET a single precast concrete product by slug
export async function GET(
  request: Request,
  context: RouteParams
) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { slug } = context.params;

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get product by slug
    const { data, error } = await supabase
      .from('precast_concrete_products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching precast concrete product:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { message: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: 'Error fetching product' },
        { status: 500 }
      );
    }

    return NextResponse.json({ product: data });
  } catch (error) {
    console.error('Product error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
