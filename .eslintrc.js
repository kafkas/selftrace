module.exports = {
  env: {
    es6: true,
    node: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:jest/recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  globals: {
    __CLIENT__: true,
    __DEV__: true,
    __SERVER__: true,
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "jest",
    "jsx-a11y",
    "import",
    "prettier",
    "react-hooks"
  ],
  rules: {
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/explicit-member-accessibility": [
      1,
      { accessibility: "no-public" }
    ],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "class-methods-use-this": 0,
    "import/prefer-default-export": 0,
    "import/no-mutable-exports": 0,
    "import/no-cycle": 0,
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    indent: "off",
    "jest/expect-expect": [1, { assertFunctionNames: ["expect*"] }],
    "lines-between-class-members": 0,
    "no-underscore-dangle": 0,
    "no-console": 1,
    "no-param-reassign": 0,
    "no-continue": 0,
    "no-nested-ternary": 0,
    "no-plusplus": 0,
    "no-restricted-globals": 0,
    "no-restricted-syntax": 0,
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false }
    ],
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: false }
    ],
    "react/jsx-filename-extension": 0,
    "react/jsx-wrap-multilines": 0,
    "react/no-did-update-set-state": 0,
    "react/jsx-indent": 0,
    "react/jsx-indent-props": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/prefer-stateless-function": 0,
    "react/sort-comp": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".json", ".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
