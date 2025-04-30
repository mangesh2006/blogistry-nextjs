import Welcome from "@/components/Welcome";
import WelcomeNavbar from "@/components/WelcomeNavbar";
import { Metadata } from "next";
import React from "react";

const page = () => {
  return (
    <>
      <WelcomeNavbar />
      <Welcome />
    </>
  );
};

export const metadata: Metadata = {
  title: "Welcome",
  description: "This is a welcome page of Blogistry",
};

export default page;
