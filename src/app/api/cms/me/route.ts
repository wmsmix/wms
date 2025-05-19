import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  try {
    // Get session cookie
    const cookieStore = cookies();
    const cmsSessionCookie = cookieStore.get('cms_session');

    if (!cmsSessionCookie?.value) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      // Parse the user data from the cookie
      const userData = JSON.parse(cmsSessionCookie.value);

      // Create Supabase client
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Get user from database to ensure they still exist and have correct role
      const { data, error } = await supabase
        .from('users')
        .select('id, username, role')
        .eq('id', userData.id)
        .single();

      if (error || !data) {
        // Clear invalid session cookie
        const response = NextResponse.json(
          { message: 'Invalid session' },
          { status: 401 }
        );
        response.cookies.set({
          name: 'cms_session',
          value: '',
          expires: new Date(0),
          path: '/',
        });
        return response;
      }

      return NextResponse.json({
        user: {
          id: data.id,
          username: data.username,
          role: data.role
        }
      });
    } catch (e) {
      // Invalid session data format
      const response = NextResponse.json(
        { message: 'Invalid session format' },
        { status: 401 }
      );
      response.cookies.set({
        name: 'cms_session',
        value: '',
        expires: new Date(0),
        path: '/',
      });
      return response;
    }
  } catch (error) {
    console.error('User info error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
