import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Metadata } from "next";

const Main = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center py-20 bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/20 dark:to-black">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to{" "}
            <span className="text-blue-600 dark:text-blue-400">Blogistry</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl text-lg mb-8">
            Your personal space to share thoughts, stories, and inspirations
            with the world.
          </p>
          <Link href="/signup">
            <Button className="text-white bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg rounded-2xl shadow-lg cursor-pointer">
              Get Started
              <MoveRight />
            </Button>
          </Link>
        </section>

        {/* About Section */}
        <section className="w-full max-w-5xl py-16 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About Blogistry
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-md md:text-lg leading-relaxed">
            Blogistry is a platform designed for creators who want to make an
            impact through their words. Whether you're sharing personal stories,
            expert advice, or creative ideas — Blogistry makes it easy,
            beautiful, and powerful. Express yourself freely and build your
            audience today!
          </p>
        </section>

        {/* Features Section */}
        <section className="w-full bg-gray-100 dark:bg-gray-900 py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-full mb-4">
                📖
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy Blogging
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Write and publish your blogs effortlessly with our simple
                editor.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-full mb-4">
                🌎
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Reach the World
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share your stories and reach readers across the globe instantly.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-full mb-4">
                🎨
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Customize
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Personalize your blog space with themes and layouts that suit
                your style.
              </p>
            </div>
          </div>
        </section>

        {/* Final Motivational Section */}
        <section className="w-full py-20 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-blue-100 dark:to-blue-900/20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Do Anything. Share Everything.
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl text-lg text-center">
            Your voice matters. Create freely, inspire minds, and connect across
            the world with Blogistry.
          </p>
        </section>
      </main>
    </>
  );
};

export const metadata: Metadata = {
  title: "Blogistry",
  description: "Welcome to Blogistry",
};

export default Main;
