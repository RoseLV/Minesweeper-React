const fs = require('fs');
const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

let entryObj = {}
let pluginsArr = []
const genEntry = () => {
  const walkDir = (rootDirectory, directory = '') => {
    fs.readdirSync(rootDirectory + directory).forEach(function(fileDir){
      const file = rootDirectory + directory + '/' + fileDir
      const stat = fs.statSync(file)
      if (stat && stat.isDirectory()) {
        walkDir(rootDirectory, directory + '/' + fileDir)
      }else{
        // 如果不是默认404file，作为入口文件
        if (path.extname(file) == '.html') {
          const name = (directory.length>1 ? (directory.slice(1) + '/') : '') + path.basename(file, '.html')
          
          entryObj[name] = 
            (process.env.NODE_ENV === 'development' ? 
              [require.resolve('react-dev-utils/webpackHotDevClient')] : [])
              .concat([
                // require.resolve('./polyfills'),
                paths.appSrc + '/pages' + directory + '/' + path.basename(file, '.html') + '/index.js',
              ]).filter(Boolean)
          
          // html 入口页面配置
          pluginsArr.push(new HtmlWebpackPlugin(
            Object.assign(
              {},
              {
                inject: true,
                template: file,
                chunks: [name],
                filename: name + '.html',
              },
              process.env.NODE_ENV === 'production'
                ? {
                    minify: {
                      removeComments: true,
                      collapseWhitespace: true,
                      removeRedundantAttributes: true,
                      useShortDoctype: true,
                      removeEmptyAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      keepClosingSlash: true,
                      minifyJS: true,
                      minifyCSS: true,
                      minifyURLs: true,
                    },
                  }
                : undefined
            )
          ))
        }
      }
    })
  }
  walkDir(paths.appPublic)
}
genEntry()

const alias = {
  'babel-runtime': path.dirname(
    require.resolve('babel-runtime/package.json')
  ),
  'react-native': 'react-native-web',
  '@': path.resolve(__dirname, '../src'),
  'swiper$': 'swiper/dist/js/swiper.js'
}

module.exports = {
  entryObj,
  pluginsArr,
  alias
}