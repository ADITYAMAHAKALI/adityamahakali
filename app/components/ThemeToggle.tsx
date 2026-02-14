"use client";

import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";
import { ThemeMode } from "./useTheme";

type ThemeToggleProps = {
  value: ThemeMode;
  onChange: (next: ThemeMode) => void;
};

const nextMode: Record<ThemeMode, ThemeMode> = {
  system: "light",
  light: "dark",
  dark: "system",
};

export default function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  const Icon = value === "system" ? FaDesktop : value === "light" ? FaSun : FaMoon;
  const label = value === "system" ? "Theme: System" : value === "light" ? "Theme: Light" : "Theme: Dark";

  return (
    <button
      type="button"
      className="dock-link dock-theme-link"
      onClick={() => onChange(nextMode[value])}
      aria-label={label}
      title={label}
    >
      <Icon size={32} aria-hidden="true" />
      {/* <span>{value}</span> */}
    </button>
  );
}
