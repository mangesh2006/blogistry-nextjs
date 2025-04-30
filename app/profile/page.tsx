import ProfilePage from "@/components/ProfilePage";
import WelcomeNavbar from "@/components/WelcomeNavbar";
import { Metadata } from "next";
import React from "react";

const page = () => {
  return (
    <>
      <WelcomeNavbar />
      <ProfilePage />
    </>
  );
};

export const metadata: Metadata = {
  title: "Profile",
  description: "Here you can see your profile",
};

export default page;
