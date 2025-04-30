"use client";

import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation"; // Import from next/navigation

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname(); // Tracks the current route

  // Use useEffect to update progress bar when route changes
  useEffect(() => {
    setProgress(30); // Initial progress when starting a route change
    setTimeout(() => setProgress(100), 1000); // Complete progress after 1 second

    // Reset progress after the page load
    return () => {
      setProgress(0);
    };
  }, [pathname]); // Only re-run when the pathname changes

  return (
    <LoadingBar
      color="#29D"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default ProgressBar;
