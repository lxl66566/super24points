import presetWind4, { type Theme } from "@unocss/preset-wind4";
import { defineConfig, type UserConfig } from "unocss";

export default defineConfig({
  presets: [presetWind4()],
  shortcuts: {
    btn: "bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200",
    "btn-square": "btn w-24 h-24 flex items-center justify-center text-3xl",
    "btn-operator": "btn w-20 h-20 flex items-center justify-center text-3xl",
  },
}) satisfies UserConfig<Theme> as UserConfig<Theme>;
