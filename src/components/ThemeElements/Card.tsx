"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Card({ children }: any) {
  const theme = useTheme();

  return (
    <div
      className="grid grid-cols-3 gap-4 bg-blue-50"
      >
      <div className="...">{children}</div>
    </div>
  );
}