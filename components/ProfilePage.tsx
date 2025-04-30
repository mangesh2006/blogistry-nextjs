"use client";
import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import EditDialouge from "./EditDialouge";
import DeleteDialouge from "./DeleteDialouge";
import Link from "next/link";

export const dynamic = "force-dynamic";

const ProfilePage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not logged in");
        return;
      }

      const fetchData = async () => {
        try {
          const res = await fetch("/api/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          if (res.status === 200) {
            setUsername(data.username);
            setEmail(data.email);
          } else {
            toast.error(data.message || "Failed to fetch profile");
          }
        } catch (error) {
          toast.error("Error fetching profile" + error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-200 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-xl dark:shadow-xl">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-4">
          {/* Profile Image */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {username}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{email}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-6 mt-8">
          {/* Edit Profile */}
          <EditDialouge username={username} setUsername={setUsername} />
          {/* Change Password */}
          <Link href={"/forgot"}>
            <Button
              variant="secondary"
              className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              <Lock size={18} /> Change Password
            </Button>
          </Link>
          {/* Delete Profile */}
          <DeleteDialouge />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
