import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["**/*.js"],
    rules: {
      "semi": "error",
    },
    languageOptions: { sourceType: "commonjs" }
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
]