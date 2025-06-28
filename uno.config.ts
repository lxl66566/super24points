import presetWind4, { type Theme } from "@unocss/preset-wind4";
import { defineConfig, type UserConfig } from "unocss";

export default defineConfig({
  presets: [presetWind4()],
  shortcuts: {
    btn: "bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200",
    "btn-square":
      "btn w-16 h-16 text-xl sm:w-24 sm:h-24 sm:text-3xl flex items-center justify-center",
    "btn-operator":
      "btn w-14 h-14 text-xl sm:w-20 sm:h-20 sm:text-3xl flex items-center justify-center",
  },
}) satisfies UserConfig<Theme> as UserConfig<Theme>;
