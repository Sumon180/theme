"use client";

import { Moon, Sun, ChevronDownIcon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState, useRef, useEffect } from "react";
import useColorStore from "@/hooks/useColorStore";
import useIsMounted from "@/hooks/useIsMounted";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { availableColors, color, setColor } = useColorStore(theme);
  const isMounted = useIsMounted();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeOptions = [
    { value: "light", label: "Light", icon: <Sun className="h-4 w-4" /> },
    { value: "dark", label: "Dark", icon: <Moon className="h-4 w-4" /> },
    { value: "system", label: "System", icon: <Monitor className="h-4 w-4" /> },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-sm rounded-md"
      >
        {isMounted && theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
        <span className="capitalize">{isMounted ? theme : "Theme"}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 p-2">
          <div className="mb-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-1">
              Theme
            </p>
            {themeOptions.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  theme === t.value
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : ""
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-1">
              Color
            </p>
            {availableColors.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setColor(c.name, true);
                  setOpen(false);
                }}
                className={`w-full flex items-center cursor-pointer gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  color.name === c.name
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : ""
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: c.name }}
                />
                {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
