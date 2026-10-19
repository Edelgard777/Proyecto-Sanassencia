export default function configurarKarma(config) {
  config.set({
    frameworks: ["jasmine", "webpack"],
    files: [
      { pattern: "src/tests/**/*.spec.jsx", watched: true },
    ],
    preprocessors: {
      "src/tests/**/*.spec.jsx": ["webpack"],
    },
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: { extensions: [".js", ".jsx"] },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { targets: { chrome: "120" } }],
                  ["@babel/preset-react", { runtime: "automatic" }],
                ],
                plugins: [[
                  "babel-plugin-istanbul",
                  {
                    include: ["src/**/*.js", "src/**/*.jsx"],
                    exclude: ["src/tests/**", "**/*.spec.jsx"],
                  },
                ]],
              },
            },
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset/resource",
          },
        ],
      },
    },
    reporters: ["progress", "spec", "coverage"],
    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text" },
        { type: "text-summary" },
        { type: "json-summary", subdir: ".", file: "coverage-summary.json" },
      ],
      include: ["src/**/*.js", "src/**/*.jsx"],
      exclude: ["src/tests/**", "**/*.spec.jsx"],
    },
    browsers: ["ChromeHeadless"],
    singleRun: false,
    restartOnFileChange: true,
    client: {
      jasmine: {
        random: false,
        stopOnSpecFailure: false,
      },
    },
  });
}
