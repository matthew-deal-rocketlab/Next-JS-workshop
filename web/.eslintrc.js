module.exports = {
  extends: [
    "next/core-web-vitals",
    "standard-with-typescript",
    "standard-jsx",
    "plugin:react/recommended",
    "prettier"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": "error",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-unused-vars": "warn"
  },
  parserOptions: {
    "project": "./tsconfig.json"
  },
  plugins: ["prettier"]
}
