"use client"
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
  const [ImgPath, setImgPath] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const handleImageChange = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not logged in");
        return;
      }

      if (inputRef.current?.files && inputRef.current.files[0]) {
        if (!email) {
          toast.error("Email not found. Cannot upload image.");
          return;
        }

        const formData = new FormData();
        formData.append("file", inputRef.current.files[0]);
        formData.append("token", token);

        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          if (res.status === 200) {
            setImgPath(data.imageUrl);
            toast.success("Image uploaded successfully!");
          } else {
            toast.error("Failed to upload image.");
          }
        } catch (error) {
          toast.error("Error uploading image." + error);
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && email) {
      const fetchImage = async () => {
        try {
          const res = await fetch("/api/fetchimg", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await res.json();

          if (res.status === 200) {
            setImgPath(data.imgUrl);
          } else {
            toast.error(data.message || "Failed to fetch image");
          }
        } catch (error) {
          toast.error("Error fetching image" + error);
        }
      };

      fetchImage();
    }
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-200 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-xl dark:shadow-xl">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-4">
          {/* Profile Image */}
          <Image
            width={96}
            height={96}
            unoptimized
            quality={90}
            src={ImgPath || "/default.png"}
            alt="Profile"
            className="w-30 h-30 rounded-full border-4 border-indigo-600 dark:border-indigo-400 object-cover"
            priority
            sizes="(max-width: 768px) 48px, 96px, 144px"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleImageChange}
          />
          <Button onClick={() => inputRef.current?.click()}>
            Upload Image
          </Button>
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
