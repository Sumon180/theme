/* eslint-disable @typescript-eslint/no-empty-object-type */
// first copy theme color from https://ui.shadcn.com/themes
// then in chatgpt:
// PROMPT: convert this css to js object. don't convert css variable to cameCase

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ColorState = {
  availableColors: {
    name: string;
    root: {};
    dark: {};
  }[];
  defaultColor: string;
  userColor?: string;
};
const availableColors = [
  {
    name: "Violet",
    root: {
      "--primary": "oklch(.541 .281 293.009)",
    },
    dark: {
      "--primary": "oklch(.606 .25 292.717)",
    },
  },
  {
    name: "Green",
    root: {
      "--primary": "oklch(0.723 0.219 149.579)",
    },
    dark: {
      "--primary": "oklch(0.696 0.17 162.48)",
    },
  },
  {
    name: "Red",
    root: {
      "--primary": "oklch(.586 .253 17.585)",
    },
    dark: {
      "--primary": "oklch(.645 .246 16.439)",
    },
  },
];
const initialState: ColorState = {
  availableColors,
  defaultColor: availableColors[0].name,
  userColor: undefined,
};
export const colorStore = create<ColorState>()(
  persist(() => initialState, {
    name: "colorStore",
  })
);

export default function useColorStore(theme: string = "light") {
  const colorState = colorStore();
  const getColor = () => {
    const userColor = colorState.availableColors.find(
      (t) => t.name === colorState.userColor
    );
    if (userColor) return userColor;
    const defaultColor = colorState.availableColors.find(
      (t) => t.name === colorState.defaultColor
    );
    if (defaultColor) return defaultColor;

    return colorState.availableColors[0];
  };

  const color = getColor();
  const cssColors: { [key: string]: string } =
    theme === "light" ? color.root : color.dark;
  return {
    availableColors,
    cssColors,
    color,
    getColor,
    setColor: (name: string, isUserColor?: boolean) => {
      colorStore.setState(
        isUserColor ? { userColor: name } : { defaultColor: name }
      );
    },
    updateCssVariables: () => {
      const color = getColor();
      const colors: { [key: string]: string } =
        theme === "light" ? color.root : color.dark;
      for (const key in colors) {
        document.documentElement.style.setProperty(key, colors[key]);
      }
    },
  };
}
