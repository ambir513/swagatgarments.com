"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Mode = "light" | "dark" | "system";

interface SettingsContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
  initialMode?: Mode;
}

export const SettingsProvider = ({ children, initialMode = "system" }: SettingsProviderProps) => {
  const [mode, setMode] = useState<Mode>(initialMode);

  return <SettingsContext.Provider value={{ mode, setMode }}>{children}</SettingsContext.Provider>;
};

export const useSettingsContext = (): SettingsContextValue => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext must be used within SettingsProvider");
  }
  return context;
};
