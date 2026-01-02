"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative bg-gray-100 dark:bg-gray-800 p-1 rounded-full transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 flex items-center justify-center overflow-hidden"
    >
      {/* Sun Icon */}
      <HiSun
        className={`h-4 w-4 cursor-pointer transition-all duration-500 ease-in-out 
      ${
        theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0 opacity-0"
      }`}
      />

      <HiMoon
        className={`h-4 w-4 cursor-pointer transition-all duration-500 ease-in-out absolute
      ${
        theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100"
      }`}
      />
    </button>
  );
}
