import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";
import tailwind from "eslint-plugin-tailwindcss";

const eslintConfig = [
  ...rrrrrrrrrrr.configs.typescript,
  ...rrrrrrrrrrr.configs.next,
  ...tailwind.configs["flat/recommended"],
  {
    ignores: ["*.cjs", "node_modules", ".next", ".github"],
    settings: {
      tailwindcss: {
        // These are the default values but feel free to customize
        callees: ["classnames", "clsx", "cn", "sx", "style"],
        config: "tailwind.config.ts", // returned from `loadConfig()` utility if not provided
        cssFiles: [
          "**/*.css",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build",
        ],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
        classRegex: "^(class(Name)?|sx|style|[a-zA-Z]+(Style|Styles))$",
      },
    },
  },
];

export default eslintConfig;
