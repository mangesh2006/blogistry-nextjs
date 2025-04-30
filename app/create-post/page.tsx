import CreateBlogPage from "@/components/CreateBlogPage";
import { Metadata } from "next";
import React from "react";

const page = () => {
  return (
    <>
      <CreateBlogPage />
    </>
  );
};

export const metadata: Metadata = {
  title: "Create Post",
  description: "Here you can create and publish you blog post",
};

export default page;
