"use client";

import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0">
      <div className="flex items-center justify-between max-w-4xl mx-auto py-2">
        <div>Logo</div>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
