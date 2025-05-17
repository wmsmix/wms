import { useState, useEffect } from 'react';
import { useSupabase } from '~/hooks/useSupabase';
import type { TableRow } from '~/types/supabase';

type Instrument = TableRow<'instruments'>;

export default function InstrumentsList() {
  const { supabase } = useSupabase();
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'error' | 'checking'>('checking');

  useEffect(() => {
    async function fetchInstruments() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('instruments')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          throw error;
        }

        setInstruments(data || []);
        setConnectionStatus('connected');
      } catch (err) {
        console.error('Error fetching instruments:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch instruments');
        setConnectionStatus('error');
      } finally {
        setLoading(false);
      }
    }

    void fetchInstruments();
  }, [supabase]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Connection status indicator */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Instruments List</h2>
        <div className="flex items-center">
          <span className="mr-2">Supabase:</span>
          {connectionStatus === 'checking' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Checking...
            </span>
          )}
          {connectionStatus === 'connected' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Connected
            </span>
          )}
          {connectionStatus === 'error' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Error
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading instruments...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading instruments</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                <p className="mt-2">
                  Please check your Supabase connection and make sure the &apos;instruments&apos; table exists.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : instruments.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No instruments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your instruments table appears to be empty.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {instruments.map((instrument) => (
                <tr key={instrument.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {instrument.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {instrument.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {instrument.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 