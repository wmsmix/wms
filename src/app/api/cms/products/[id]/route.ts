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

// GET a single product by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get product by ID
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
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

// PUT/PATCH - update a product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
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

    // Check if product exists
    const { data: existingProduct, error: checkError } = await supabase
      .from('products')
      .select('id')
      .eq('id', id)
      .single();

    if (checkError || !existingProduct) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // Update product
    const { data, error } = await supabase
      .from('products')
      .update({
        name: body.name,
        description: body.description || '',
        price: body.price || null,
        category: body.category || null,
        image_url: body.image_url || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return NextResponse.json(
        { message: 'Error updating product' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Product updated successfully',
      product: data
    });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE a product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Delete product
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return NextResponse.json(
        { message: 'Error deleting product' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Also support PATCH for partial updates
export const PATCH = PUT;
