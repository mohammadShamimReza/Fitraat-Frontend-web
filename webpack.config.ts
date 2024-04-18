const path = require("path");

module.exports = {
  // Other webpack configurations...
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg|xml|mp3)$/i,
        type: "asset/resource",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]", // Corrected placeholder
              outputPath: "src/app/assets/", // Adjust the output path as needed
            },
          },
        ],
      },
    ],
  },
};
