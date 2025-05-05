"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen overflow-x-hidden bg-white-10 font-titillium text-white-10">
          <div className="hero-container w-full overflow-hidden">
            <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gray-base pt-20">
              <h1 className="text-white text-4xl font-bold">Server Error</h1>
              <p className="text-white mt-4">Terjadi kesalahan pada server</p>
              <button
                onClick={() => reset()}
                className="text-white mt-4 rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
