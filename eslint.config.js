const js = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const globals = require("globals");

module.exports = defineConfig([
    {
        files: ["**/*.js", "**/*.cjs"],
        languageOptions: {
            sourceType: "commonjs",
            ecmaVersion: "latest",
            globals: {
                ...globals.browser,
                ...globals.jest,
                ...globals.node,
              }
        },
        ...js.configs.recommended,
    },
]);
