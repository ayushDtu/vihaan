module.exports = {
    extends: [
      "universe/native",
      "universe/shared/typescript-analysis",
      "plugin:react-hooks/recommended",
    ],
    overrides: [
      {
        files: ["*.ts", "*.tsx", "*.d.ts"],
        parserOptions: {
          project: "./tsconfig.json",
        },
      },
    ],
    rules: {
      "no-console": "error",
      "import/newline-after-import": ["error", { count: 1 }],
    },
  };
  