"use client";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F2771] w-full h-20 flex items-center px-4 md:px-10 lg:px-20">
      <div className="hidden md:flex w-full max-w-[1272px] mx-auto items-center justify-between">
        <Link href="/">
          <Image
            src="/svgs/wms-logo.svg"
            alt="Logo"
            width={97}
            height={39}
            priority
            className="object-contain"
          />
        </Link>

        <div className="flex gap-6 lg:gap-10 text-sm font-normal uppercase tracking-wide text-white-base items-center">
          <Link href="/" className="cursor-pointer hover:text-white-10 transition-colors">Home</Link>
          <Link href="/products" className="cursor-pointer hover:text-white-10 transition-colors">Product & Services</Link>
          <Link href="/about" className="cursor-pointer hover:text-white-10 transition-colors">About</Link>
          <Link href="/projects" className="cursor-pointer hover:text-white-10 transition-colors">Projects</Link>
          <Link href="/news" className="cursor-pointer hover:text-white-10 transition-colors">Insights</Link>
          <Link href="/contact">
            <Button text="CONTACT" height="40px" />
          </Link>
        </div>
      </div>

      <div className="md:hidden flex w-full items-center justify-between">
        <Link href="/">
          <Image
            src="/svgs/wms-logo.svg"
            alt="Logo"
            width={80}
            height={30}
            priority
            className="object-contain"
          />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white-base transform transition-transform duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-[#0F2771] shadow-lg transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100 visible py-4" : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-2">
          <Link href="/" className="cursor-pointer text-sm uppercase text-white-base hover:text-white-10 transition-colors py-2">
            Home
          </Link>
          <Link href="/products" className="cursor-pointer text-sm uppercase text-white-base hover:text-white-10 transition-colors py-2">
            Product & Services
          </Link>
          <Link href="/about" className="cursor-pointer text-sm uppercase text-white-base hover:text-white-10 transition-colors py-2">
            About
          </Link>
          <Link href="/projects" className="cursor-pointer text-sm uppercase text-white-base hover:text-white-10 transition-colors py-2">
            Projects
          </Link>
          <Link href="/news" className="cursor-pointer text-sm uppercase text-white-base hover:text-white-10 transition-colors py-2">
            Insights
          </Link>
          <Link href="/contact" className="py-2">
            <Button text="CONTACT" height="40px" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
