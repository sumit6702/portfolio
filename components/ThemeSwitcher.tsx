"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";
import { Tooltip } from "@nextui-org/tooltip";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tooltip content={theme === "dark" ? "Light mode" : "Dark mode"}>
      <div className="">
        {theme === "dark" ? (
          <HiSun className="cursor-pointer" onClick={() => setTheme("light")} />
        ) : (
          <HiMoon className="cursor-pointer" onClick={() => setTheme("dark")} />
        )}
      </div>
    </Tooltip>
  );
}
