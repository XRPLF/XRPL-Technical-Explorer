module.exports = {
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@ledgerhq/devices/hid-framing': '@ledgerhq/devices/lib/hid-framing'
      }
    }
  }
}
