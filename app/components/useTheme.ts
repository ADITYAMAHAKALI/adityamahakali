"use client";

import { useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

type EffectiveTheme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme-mode";

function getSystemTheme(): EffectiveTheme {
  if (typeof window === "undefined") {
    return "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>("dark");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, mode);

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const resolved: EffectiveTheme = mode === "system"
        ? media.matches
          ? "dark"
          : "light"
        : mode;

      setEffectiveTheme(resolved);
      const root = document.documentElement;
      root.classList.remove("theme-light", "theme-dark");
      root.classList.add(`theme-${resolved}`);
    };

    applyTheme();

    if (mode === "system") {
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }

    return undefined;
  }, [mode]);

  const cycleMode = useMemo(
    () => () => {
      setMode((current) => {
        if (current === "system") {
          return "light";
        }
        if (current === "light") {
          return "dark";
        }
        return "system";
      });
    },
    []
  );

  return { mode, setMode, effectiveTheme, cycleMode, getSystemTheme };
}
