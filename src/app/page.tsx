
import Link from "next/link";
import Button from "~/components/Button";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-[#2e026d] to-[#15162c] min-h-screen text-white font-titillium">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] font-noto">
          Welcome to <span className="text-[hsl(280,100%,70%)]">T3 App</span>
        </h1>

        <p className="text-lg text-center max-w-2xl mt-4">
          This is a Next.js + Tailwind project created using{" "}
          <span className="font-semibold text-blue-extraLight">T3 Stack</span>.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button text="Get Started"  />
          <Link
            href="https://create.t3.gg/"
            target="_blank"
            className="text-lg font-bold text-white hover:text-blue-extraLight"
          >
            Learn More →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
