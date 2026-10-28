import { JetBrains_Mono, Manrope, Playfair_Display } from "next/font/google";

/** Дисплейный сериф: авторитет, редакционный характер. Есть кириллица. */
export const fontDisplay = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

/** Интерфейсный гротеск: геометрия + отличная кириллица. */
export const fontSans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

/** Моноширинный: технические метки, цифры, данные. */
export const fontMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
