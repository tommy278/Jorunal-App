"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Card({ children }: any) {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        color: theme.colors.text,
        padding: "1rem",
        boxShadow: theme.shadows.soft,
      }}
    >
      {children}
    </div>
  );
}