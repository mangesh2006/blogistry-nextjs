"use client";

import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation"; 

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname(); 

  useEffect(() => {
    setProgress(30); 
    setTimeout(() => setProgress(100), 1000); 

    return () => {
      setProgress(0);
    };
  }, [pathname]); 

  return (
    <LoadingBar
      color="#29D"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default ProgressBar;
