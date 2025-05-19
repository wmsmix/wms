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

// GET all products
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

    // Get all products
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { message: 'Error fetching products' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      products: data || []
    });
  } catch (error) {
    console.error('Products error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - create a new product
export async function POST(request: Request) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { message: 'Product name is required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Insert new product
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: body.name,
        description: body.description || '',
        price: body.price || null,
        category: body.category || null,
        image_url: body.image_url || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return NextResponse.json(
        { message: 'Error creating product' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Product created successfully', product: data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
