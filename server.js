// 在node中使用webpack
const express = require('express')
const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
// 运用webpack配置生成的编译器
const complier = webpack(config)
// webpack返回的编译器，让编译器执行一次，会重新打包一次代码
const app = express()
// WebpackDevMiddleware这个中间件会监听webpack打包生成的代码的变化，
// 只要文件改变了，complire就会重新运行，打包生成对应文件的publicPath和配置相同 
app.use(WebpackDevMiddleware(
  complier,
  {}
))
app.listen('3000', () => {
  console.log('server is listen at 3000');
})
