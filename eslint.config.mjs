import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default [
    stylistic.configs.customize({
        indent: 4,
        quotes: "double",
        semi: true,
        arrowParens: true,
    }),
    {
        files: ["**/*.js"],
        languageOptions: { sourceType: "commonjs" },
    },
    {
        languageOptions: { globals: globals.node },
    },
    pluginJs.configs.recommended,
];
