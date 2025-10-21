"use client";

import { Mode } from "../contexts/settingsContext";
import { useSettingsContext } from "../contexts/settingsContext";

export const useSettings = () => {
  const { mode, setMode } = useSettingsContext();

  const toggleMode = () => {
    if (mode === "light") setMode("dark");
    else if (mode === "dark") setMode("system");
    else setMode("light");
  };

  // Return the next mode without actually changing it
  const getNextMode = (): Mode => {
    if (mode === "light") return "dark";
    if (mode === "dark") return "system";
    return "light";
  };

  return { mode, setMode, toggleMode, getNextMode };
};
