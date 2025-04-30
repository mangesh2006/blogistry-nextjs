import ForgotPassword from "@/components/ForgotPassword";
import { Metadata } from "next";
import React from "react";

const page = () => {
  return <>
  <ForgotPassword />
  </>;
};

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Here you can reset your password",
};

export default page;
