module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "react-hooks", "react-native"],
  // rules: {
  //   "no-restricted-imports": [
  //     "warn",
  //     {
  //       paths: [
  //         {
  //           name: "react-native",
  //           importNames: ["Text"],
  //           message: "Please import it from components folder instead.",
  //         },
  //       ],
  //     },
  //   ],
  // },
};
