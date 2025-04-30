import React from "react";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import { Metadata } from "next";

const Home = () => {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
};

export const metadata: Metadata = {
  title: "Blogistry",
  description: "This is a home page of Blogistry",
};

export default Home;
