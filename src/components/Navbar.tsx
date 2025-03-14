"use client";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0F2771] w-full h-20 flex items-center px-4 md:px-10 lg:px-20 sticky top-0 z-50">
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
          <span className="cursor-pointer">Home</span>
          <span className="cursor-pointer">Product & Services</span>
          <span className="cursor-pointer">About</span>
          <span className="cursor-pointer">Projects</span>
          <span className="cursor-pointer">Insights</span>
          <Button text="CONTACT" height="40px" />
        </div>
      </div>

      <div className="md:hidden absolute top-0 left-0 w-full bg-[#0F2771] h-20 flex items-center justify-between px-4">
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
          className={`text-white-base transform transition-transform duration-300 ${
            isOpen ? "scale-100" : "scale-50"
          }`}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-[#0F2771] transition-all duration-300 ${
          isOpen ? "opacity-100 visible py-4" : "opacity-0 invisible h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center space-y-3">
          <span className="cursor-pointer text-sm uppercase text-white-base">
            Home
          </span>
          <span className="cursor-pointer text-sm uppercase text-white-base">
            Product & Services
          </span>
          <span className="cursor-pointer text-sm uppercase text-white-base">
            About
          </span>
          <span className="cursor-pointer text-sm uppercase text-white-base">
            Projects
          </span>
          <span className="cursor-pointer text-sm uppercase text-white-base">
            Insights
          </span>
          <Button text="CONTACT" height="40px" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
