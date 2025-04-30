"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ModeToggle } from "./Theme";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <nav className="border-b bg-white/70 dark:bg-gray-900/20 dark:border-gray-700 backdrop-blur-sm z-10 sticky top-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                className="text-black dark:text-white font-bold text-2xl"
                href="/"
              >
                Blogistry
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-5">
              <Link
                className="text-black transition-all duration-200 ease-in-out transform hover:scale-105 dark:text-white"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="text-black transition-all duration-200 ease-in-out transform hover:scale-105 dark:text-white"
                href="/signup"
              >
                Signup
              </Link>
              <ModeToggle />
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger>
                  {/* Icon for mobile menu */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      <Link
                        className="text-black dark:text-white font-bold text-2xl"
                        href="/"
                      >
                        Blogistry
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div>
                    <div className="flex flex-col items-center gap-5 mt-5">
                      <Link
                        className="text-black transition-all duration-200 ease-in-out transform hover:scale-105 dark:text-white"
                        href="/login"
                      >
                        Login
                      </Link>
                      <Link
                        className="text-black transition-all duration-200 ease-in-out transform hover:scale-105 dark:text-white"
                        href="/signup"
                      >
                        Signup
                      </Link>
                      <ModeToggle />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
