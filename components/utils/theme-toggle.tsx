"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { useSettings } from "../hooks/use-settings";
import { ThemeAnimate, useThemeTransition } from "./theme-animate";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { mode, setMode } = useSettings();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleClick = useCallback(() => {
    startTransition(() => {
      // Calculate next theme BEFORE updating state
      let nextTheme: "light" | "dark";

      if (mode === "light") {
        nextTheme = "dark";
      } else if (mode === "dark") {
        nextTheme = "light";
      } else if (resolvedTheme === "light") {
        nextTheme = "dark";
      } else {
        nextTheme = "light";
      }

      // Now update both states with the calculated value
      setMode(nextTheme);
      setTheme(nextTheme);
    });
  }, [mode, setMode, setTheme, startTransition]);

  if (!mounted) return null;

  // Use resolvedTheme for correct icon/animation
  const currentTheme = resolvedTheme || "light";

  return (
    <ThemeAnimate
      theme={currentTheme as "light" | "dark"}
      onClick={handleClick}
      variant="circle-blur"
      start="top-right"
    />
  );
};
