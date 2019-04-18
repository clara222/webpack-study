1. webpack是一个**模块打包工具**
```
npx webpack ./src/index.js
```
对```index.js```文件进行翻译（用webpack对index.js的内容进行打包）

2. 支持ES Module AMD CMD CommonJs模块引入规范
3. 安装方式：推荐在项目内安装，不推荐全局安装
```
npm install webpack webpack-cli -D
```
指定webpack版本： 
```
npm install webpack@4.26.0 webpack-cli -D
```
4. __dirname指的是当前文件所在目录的绝对路径
5. 运行webpack的方式：
* webpack index.js
* npx webpack index.js
* npm run bundle -> webpack

本质上都是在命令行里运行webpack命令，查找默认配置文件webpack.config.js
6. loader

webpack默认只打包js文件，其他的CSS、JPG等静态资源需要安装loader进行打包（webpack不能识别非js后缀的静态文件模块，需要使用loader让webpack识别出来）

* url-loader和file-loader十分相似，只不过多了一个limit 配置项，小于limit指定字节的编译成base64打包进js中，大于指定字节大小的放入dist目录中
* css-loader的作用是把所有的css文件合并成一段css，style-loader的作用是把css-loader 生成的内容挂载到页面的head部分，head部分会有一个style标签。
* webpack中loader的执行顺序：**从下往上**，**从右往左**
* 自动添加css浏览器厂商前缀的loader: ```postcss-loader```，使用postcss-loader需配置```postcss-config.js```
* 使用css-loader的```options {importLoaders: 2}```可以保证，在一个 scss文件里通过import引入的另一个scss文件，都会依次从下往上执行每一个loader
* css Module: css-loader的```options {modules: true}```
  开启**css模块化**打包，开启后，代码内引入css变为对象的引入方式：

```
import './scss/index.scss'
img.classList.add('avatar')
```
变为：
```
import style from './scss/index.scss'
img.classList.add(style.avatar)
```
7. plugins

plugin可以在webpack运行到某个时刻的时候，帮我们做一些事情（在某些打包节点上做一些工作）

* html-webpack-plugin会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
* clean-webpack-plugin会在打包时自动帮我们把dist目录删除，然后再执行打包。这样避免来回手动删包

8.  sourceMap

是打包编译后的文件和源文件的**映射关系**，用于开发者调试用
（比如当前知道编译后dist目录下main.js第90行出错，实际上对应的是开发目录src下index.js第2行出错了）

mode: development（开发者模式）默认sourceMap已配置
* 使用```devtool```配置sourceMap
* 关闭sourceMap
```
devtool: 'none'
```
* source-map 把映射文件生成到单独的文件，最完整但最慢
* inline-source-map这个配置会将.map文件转为base64内嵌入打包后的js文件中，当代码量很大时，这个配置会将出错精确到第几行第几个字符的位置，这样的映射比较耗性能
* cheap-inline-sourse-map（加上cheap）这个配置会将出错仅仅精确到第几行，打包性能会得到一定的提升（并且这个只针对业务代码，不会管引入的第三方模块的问题）
* cheap-module-inline-sourse-map（加上module）这个配置不仅仅针对业务代码，还针对第三方模块和loader里面的内容
* eval是执行效率最快，性能最好的一种方式

最佳实践：
develop模式下使用cheap-module-eval-source-map，porduction模式下一般不开启，如果要定位错误的话使用cheap-module-source-map
9. Entry与Output的基础配置

在打包多入口文件时的配置
```
entry: {
   	main: './src/index.js',
    sub: './src/index.js'
},
output: {
    publicPath: 'http://cdn.com.cn', //将注入到html中的js文件前面加上地址
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
},
```
10. webpackDevServer

开启一个web服务器，监听文件改动自动重新打包编译，并且浏览器自动刷新，解决每次在src里编写完代码都需要手动重新运行 npm run dev的问题，提升开发效率。
```
npm i webpack-dev-server –D
```
webpack-dev-server是将文件**打包到内存中**，有助于开发

在webpack.config.js 中，添加 ```devServer:{ }```
* contentBase :配置开发服务运行时的文件根目录
* open: true 自动打开浏览器
* host：开发服务器监听的主机地址
* compress :开发服务器是否启动gzip等压缩
* port：配置开发服务器监听的端口
* proxy: 开启跨域配置代理
* hot: true 开启HMR热更新
* hotOnly: true   即使html功能没有生效，也不让浏览器自动刷新

注：开启HMR热更新，需配合webpack自带的HotModuleReplacementPlugin插件一起使用
11. babel的使用

参见：https://www.babeljs.cn/setup#installation

引入babel-polyfill会让包变得很大，所以需要按需引入，配合preset-env，配置```useBuiltIns: 'usage' ```选项

useBuiltIns打包时根据业务代码需求来注入babel-polyfill里面对应的内容，没有用到的es6 特性不会被打包，所以打包后的代码体积会明显减小

babel-polyfill会通过全局变量的方式来注入promise、map这些es6语法，这样会污染到全局环境，如果是自己做组件库，自己开发第三方模块的话，就不太适合用babel-polyfill来打包。我们使用transform-runtime来进行打包，它不存在全局变量污染这种情况，配置```corejs: 2```选项（需安装```runtime-corejs2```）。
* 业务代码： 配置preset-env，使用babel-polyfill
```
npm i babel-loader @babel/core @babel/preset-env -D
// 生产依赖，兼容低版本浏览器
npm install --save @babel/polyfill

{ 
    test: /\.js$/, 
    exclude: /node_modules/, 
    loader: "babel-loader",
    options: {
      "presets": [["@babel/preset-env",{
        useBuiltIns: 'usage'
      }]]  
    }
}

// 在业务代码运行之前最顶部导入
import "@babel/polyfill";
```
在编译时发现报如下错：
```
Module not found: Error: Can't resolve 'core-js/es6'
```
解决方案：
```
npm i -D core-js@2.5.7
```
参考：https://stackoverflow.com/questions/55308769/module-not-found-error-cant-resolve-core-js-es6
* 封装组件库：使用plugin-transform-runtime插件
```
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
npm install --save @babel/runtime-corejs2

{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2, // 这里要改成2
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```













