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
      "--primary": "#7f22fe",
    },
    dark: {
      "--primary": "#8e51ff",
    },
  },
  {
    name: "Green",
    root: {
      "--primary": "#009689",
    },
    dark: {
      "--primary": "#00bba7",
    },
  },
  {
    name: "Red",
    root: {
      "--primary": "#e60076",
    },
    dark: {
      "--primary": "#f6339a",
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
