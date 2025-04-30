import VerifyOtp from "@/components/VerifyOtp";
import { Metadata } from "next";
import React from "react";

const page = () => {
  return (
    <>
      <VerifyOtp/>
    </>
  );
};

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Here you can verify your email id",
};

export default page;
