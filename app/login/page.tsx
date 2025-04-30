import Login from "@/components/Login";
import React from "react";
import { Metadata } from "next";

const page = () => {
  return (
    <>
      <Login />
    </>
  );
};

export const metadata: Metadata = {
  title: "Login",
  description: "Here you can login to account",
};

export default page;
