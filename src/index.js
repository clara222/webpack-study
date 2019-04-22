import "@babel/polyfill";
import pic from './images/timg.jpg'
import './scss/index.scss'
var img = new Image()
img.src = pic
img.classList.add('avatar')
document.body.append(img)
// var root = document.getElementById('root')
// root.innerHTML='<div class="iconfont icon-icon_collect color"></div>'

const foo = () => {
  return new Promise((resolve, reject) => {
    resolve(99)
  })
}

console.log(foo());

import './page'