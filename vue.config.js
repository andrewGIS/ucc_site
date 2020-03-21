module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/~master/ucc/'
    : '/',
  configureWebpack: {
    devtool: 'source-map'
  }
}
