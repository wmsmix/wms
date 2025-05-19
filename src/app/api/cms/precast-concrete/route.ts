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

// GET all precast concrete products
export async function GET(request: Request) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get all precast concrete products
    const { data, error } = await supabase
      .from('precast_concrete_products')
      .select('*')
      .order('title');

    if (error) {
      console.error('Error fetching precast concrete products:', error);
      return NextResponse.json(
        { message: 'Error fetching precast concrete products' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      products: data || []
    });
  } catch (error) {
    console.error('Precast concrete products error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
