module.exports = {
  css: {
    // modules: true
    //     loaderOptions:{
    //         sass:{}
    //     }
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.js"
      }
    },
    module: {
      rules: [
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          loader: "file-loader"
        }
      ]
    }
  }
};
