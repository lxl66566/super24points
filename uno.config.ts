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
  preflights: [
    {
      getCSS: () => `
        /* For Webkit browsers (Chrome, Safari) */
        ::-webkit-scrollbar {
          width: 12px; /* width of the scrollbar */
          height: 12px; /* height of the scrollbar for horizontal scrollbars */
        }

        ::-webkit-scrollbar-track {
          background: #2d3748; /* dark background for the track */
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #4a5568; /* darker thumb color */
          border-radius: 10px;
          border: 3px solid #2d3748; /* padding around the thumb */
        }

        /* For Firefox */
        * {
          scrollbar-color: #4a5568 #2d3748; /* thumb color track color */
          scrollbar-width: thin; /* auto | thin | none */
        }
      `,
    },
  ],
}) satisfies UserConfig<Theme> as UserConfig<Theme>;
