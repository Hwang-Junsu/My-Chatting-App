const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");
const cwd = process.cwd();
const folderPaths = [
  path.resolve(cwd, "src/constants"),
  path.resolve(cwd, "src/types"),
];
const rules = [
  {
    test: /\.ts$/,
    exclude: /^node_modules/,
    loader: "ts-loader",
    include: [folderPaths],
    options: {
      transpileOnly: true,
    },
  },
  {
    test: /\.node$/,
    loader: "node-loader",
  },
];

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "./tsconfig.json"),
        extensions: [".ts", ".tsx", ".js"],
        logLevel: "INFO",
        baseUrl: path.resolve(__dirname, "."),
        mainFields: ["browser", "main"],
      }),
    ];
    if (!isServer) {
      config.target = "electron-renderer";
    }
    config.module.rules = [...config.module.rules, ...rules];
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".tsx"];
    return config;
  },
};
