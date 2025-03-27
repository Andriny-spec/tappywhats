module.exports = {
  extends: ["next/core-web-vitals"],
  ignorePatterns: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "off",
    "@next/next/no-img-element": "off"
  }
};
