import ExplorePage from "@/components/ExplorePage";
import WelcomeNavbar from "@/components/WelcomeNavbar";
import { Metadata } from "next";
import React from "react";

const page = () => {
  return <>
  <WelcomeNavbar/>
  <ExplorePage />
  </>
};

export const metadata: Metadata = {
  title: "Explore",
  description: "Here you can read the blogs by other authors",
};

export default page;
