"use client";

import Link from "next/link";
import { LogOut, Home, Compass, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const WelcomeNavbar = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      } else {
        setToken(token);
      }
    }
  }, [router]);

  const handleLogOut = async () => {
    if (!token) return;

    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        toast.info(data.message || "Logged out successfully");
        router.push("/"); 
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("An error occurred during logout" + error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 dark:bg-gray-900/20 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo or App Name */}
        <Link
          href="/welcome"
          className="text-2xl font-bold text-white dark:text-gray-200"
        >
          Blogistry
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/welcome"
            className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white flex items-center gap-1"
          >
            <Home size={18} />
            <span className="hidden md:inline">Home</span>
          </Link>

          <Link
            href="/explore"
            className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white flex items-center gap-1"
          >
            <Compass size={18} />
            <span className="hidden md:inline">Explore</span>
          </Link>

          <Link
            href="/profile"
            className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white flex items-center gap-1"
          >
            <User size={18} />
            <span className="hidden md:inline">Profile</span>
          </Link>

          {/* Logout Button */}
          <Button
            onClick={handleLogOut}
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-red-400 dark:text-gray-400 dark:hover:text-red-500"
          >
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default WelcomeNavbar;
