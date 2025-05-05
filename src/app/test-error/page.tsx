'use client';

export default function TestError() {
  // Memicu error secara sengaja
  throw new Error('Ini adalah error test');

  return (
    <div>
      Halaman ini tidak akan pernah muncul karena error di atas
    </div>
  );
} 