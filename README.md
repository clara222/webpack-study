# webpack-study
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
