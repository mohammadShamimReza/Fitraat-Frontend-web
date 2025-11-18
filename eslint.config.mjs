// import tsPlugin from "@typescript-eslint/eslint-plugin";
// import tsParser from "@typescript-eslint/parser";
// import next from "eslint-config-next";

// export default [
//   // Next.js recommended rules including Core Web Vitals
//   ...next("core-web-vitals"),

//   // TypeScript rules
//   {
//     files: ["**/*.{ts,tsx}"],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         project: "./tsconfig.json",
//         tsconfigRootDir: process.cwd(),
//       },
//     },
//     plugins: {
//       "@typescript-eslint": tsPlugin,
//     },
//     rules: {
//       "@typescript-eslint/no-unused-vars": "warn",
//       "@typescript-eslint/no-explicit-any": "off",
//     },
//   },

//   // Ignore build folders
//   {
//     ignores: ["node_modules", ".next", "dist", "out", "build", "public"],
//   },
// ];



import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;