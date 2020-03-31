module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/~master/ucc_temp/'
    : '/',
  configureWebpack: {
    devtool: 'source-map'
  }
}
