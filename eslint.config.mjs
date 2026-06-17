import { defineConfig } from "eslint/config";
import next from "eslint-config-next";

const eslintConfig = defineConfig([
  next,

  // Ignore build and generated files
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
]);

export default eslintConfig;
