import { useState, useEffect } from 'react';
import { useSupabase } from '~/hooks/useSupabase';

export default function SupabaseTest() {
  const { supabase } = useSupabase();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        // Use a simple health check query
        const { error } = await supabase.rpc('version');
        
        if (error) {
          console.error('Supabase connection error:', error);
          setError(error.message);
          setIsConnected(false);
        } else {
          setIsConnected(true);
          setError(null);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsConnected(false);
      }
    }

    void checkConnection();
  }, [supabase]);

  return (
    <div className="p-4 border rounded-lg bg-gray-50 my-4">
      <h2 className="text-lg font-semibold mb-2">Supabase Connection Test</h2>
      {isConnected === null ? (
        <p>Checking connection...</p>
      ) : isConnected ? (
        <p className="text-green-600">✅ Connected to Supabase</p>
      ) : (
        <div>
          <p className="text-red-600">❌ Failed to connect to Supabase</p>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
} 