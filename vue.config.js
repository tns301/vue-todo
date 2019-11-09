const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  productionSourceMap: false,
  publicPath: './',
  pluginOptions: {
    sourceDir: "client/src"
  },
  devServer: {
    port: process.env.PORT,
    proxy: {
        "/api/*": {
          target: `http://localhost:${process.env.PORT_SERVER}`,
          secure: false
        }
    }
  },
}