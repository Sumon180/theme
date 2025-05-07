"use client";
import React from "react";
import { ThemeProvider } from "./ThemeProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div>{children}</div>
    </ThemeProvider>
  );
}
