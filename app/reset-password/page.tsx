import ResetPassword from "@/components/ResetPassword";
import { Metadata } from "next";
import React from "react";

const page = () => {
  return (
    <>
      <ResetPassword />
    </>
  );
};

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Here you can set new password for your account",
};

export default page;
