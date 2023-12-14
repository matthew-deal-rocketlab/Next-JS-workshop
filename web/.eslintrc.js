module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended"
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    'react/react-in-jsx-scope': 0,
    "prettier/prettier": "error",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error"
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ["prettier", "cypress", "@typescript-eslint"]
}
