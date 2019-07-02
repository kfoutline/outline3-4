const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require("vue-loader");
const CleanWepackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// 导出配置模块
module.exports = {
  entry: {
    main: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name]-bundle.js"
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "./src"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
    port: 9000 //端口改为9000
    //   open:true, // 自动打开浏览器，适合懒人
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@com": path.resolve(__dirname, "src", "components")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: ["vue-loader"]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "./node_modules"),

        use: [
          {
            loader: "babel-loader"
            // options:{
            // 	presets:['env']
            // }
          }
        ]
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(?:jpe?g|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "img/[name].[hash:8].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true
    }),

    // Vue-loader的使用在15.*之后的版本都需要伴随 VueLoaderPlugin
    new VueLoaderPlugin(),

    new CleanWepackPlugin(["dist"])

    // new CopyWebpackPlugin([{
    // 	from:'./src/img',
    // 	to:'img'
    // }])
  ]
};
