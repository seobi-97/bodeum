import { useState, useEffect } from "react";

function useInnerWidth() {
  const isClient = typeof window === "object";
  const getSize = () => {
    return { width: isClient ? window.innerWidth : undefined };
  };
  const [windowSize, setWindowSize] = useState(getSize);
  const handleResize = () => {
    setWindowSize(getSize());
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return windowSize;
}

export default useInnerWidth;
