import Signup from "@/components/Signup";
import { Metadata } from "next";
import React from "react";

const page = () => {
  return (
    <>
      <Signup />
    </>
  );
};

export const metadata: Metadata = {
  title: "Signup",
  description: "Here you can create your account for Blogistry",
};

export default page;
