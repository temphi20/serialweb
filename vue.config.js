module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      externals: ['serialport'],
      nodeModulesPath: ['../../node_modules', './node_modules']
    }
  },
}
