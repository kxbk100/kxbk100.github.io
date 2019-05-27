---
title: 【Career】HTML & CSS面试
date: 2019年04月08日 00:27:43
categories: Career
typora-root-url: ..
typora-copy-images-to: ../images
---

@[toc]
# 移动端
> ⚠️移动端适配

移动端适配我比较常用的是通过**vm + postcss-pxtorem**这样的方式来适配

- vw是基于视图的长度单位，是Viewport's Width简写，1vw等于window.innerWidth 的 1%
- 常规的rem的适配方案和flexible，其实就是通过 js 动态计算，模拟 vw 的效果，过去使用这种方案主要原因是 vw 存在一定的兼容问题，不过对于现在而言，vw 也基本能满足对兼容性的要求

---

1. 首先我们设置html font-size为10vw

```css
html {
    font-size: 10vw;
}
```

2. 以750UI图为例，在 CSS 中，直接使用UI图上的长度值，单位设置为 px

```css
.head {
    width: 750px;
}
```

3. 引入postcss-pxtorem插件来实现移动端适配

```js
require('postcss-pxtorem')({
    rootValue: 75,
    unitPrecision: 5,
    propList: ['*'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
})
```

4. 引入viewport-units-polyfill解决兼容性问题，**直接将js脚本放到页面的head中**

- viewport-units-polyfill 在 viewport-units-buggyfill 基础上做了些修改，主要是把大量的遍历工作去掉，只针对 `html font-size` 做兼容处理，只用到了vm单位，大大优化了性能
- 而使用viewprort-units-buggyfill会遍历页面中所有的css，找到用vw的css转化为px，在用到的vw的地方添加content，会影响到img和伪元素，所以⾃定义的content需要注意，使⽤`!important`

> 边框1px问题

**原因**

CSS中的1px并不等于移动设备的1px，这个是由dpr决定的（devicePixelRatio = 物理像素 / 独⽴像素）

**解决⽅案**：1px边框的本质是弄出0.5px的边框

- tranform加伪类标签：利用伪类标签，根据父级定位，大小根据媒体查询缩放实现效果，推荐，兼容性较好
- viewport + rem：动态更改meta标签viewport的scale，比如说dpr=2，initial-scale=0.5
- 设置border-image为一张透明的图片
- 设置background-image渐变实现，并使用svg插件

> 移动页面整体布局

- 需要head、foot有吸顶、吸底的效果，常规的使用fixed布局有存在一些问题，可以使用flex布局

# CSS
> CSS选择器优先级

**结论**

`!important` > 内联(1,0,0,0) > ID选择器: (0,1,0,0) > 类选择器：(0,0,1,0) > 伪类/属性（`li.red`） > 标签选择器：(0,0,0,1) > 通配符

**优先级是由 A 、B、C、D 的值来决定的**

- 如果存在**内联样式**，那么 A = 1, 否则 A = 0（`style = "color: red;"`）
- B 的值等于 **ID选择器** 出现的次数（`#id`）
- C 的值等于 **类选择器** （`.class`）和 **属性选择器**（`E[attr]`） 和 **伪类**（`a:link`、`:focus`） 出现的总次数
- D 的值等于 **标签选择器**（`p`） 和 **伪元素**（`E:before`） 出现的总次数 

**比较规则**

- 从左往右依次进行比较 ，较大者胜出
- 如果相等，则继续往右移动一位进行比较 
- 如果4位全部相等，则后面的会覆盖前面的

> 垂直⽔平居中实现

- 知道宽高：使用relative+absolute绝对定位，负margin宽⾼的50%加以调整
- 未知宽高：`transform: translate(-50%, -50%); transform-style: preserve-3d`
- flex布局：`justify-content: center; align-items: center;`
- grid：`html, body {height: 100%; display: grid}; element {margin: auto}`
- table-cell布局：`display: table-cell; vertical-align: middle`

> flex布局

- 容器**默认**存在两根主轴：水平方向主轴 (main axis)和垂直方向交叉轴 (cross axis)，默认项目按主轴排列
- `flex-direction` 属性决定主轴的方向，row主轴水平起点在左端（默认），column主轴垂直起点在上边沿
- `justify-content` 属性定义项目在**主轴**上的对齐方式flex-start左对齐（默认值）,flex-end右对齐，center居中
- `align-items`属性定义在**交叉**轴上的对齐方式（对齐方式与交叉轴的方向有关，暂设交叉轴从上到下），stretch如果项目未设置高度或设为auto，将占满整个容器的高度（默认值），flex-start起点对齐，flex-end终点对齐，center中点对齐
- `flex-grow` 属性定义项目的放大比例，属性值为数字，默认值为0，即如果空间有剩余也不放大，可以为小数，按比例占据剩余空间
- `flex-shrink` 属性定义项目的缩小比例，属性值为非负整数，默认值为1，即如果空间不足将等比缩小；属性值为0时项目不缩小，如果所有项目属性值都为0，则当空间不足时，项目撑破容器而溢出
- `flex-basis` 属性定义在分配多余空间之前，项目占据的主轴空间，属性值默认为auto
- `flex`属性是`flex-grow`、`flex-shrink`和`flex-basis`的简写，默认值为`0 1 auto`，第一个值必需，后两个值可选
- 可以用`flex:auto;`代替 `flex:1 1 auto;`
- 可以用`flex:none;`代替 `flex:0 0 auto;`


> reset.css 和 normalize.css 有什么区别

- reset.css：直接去掉浏览器所有样式，但是这种方式加载极慢，性能较低

风靡一时的reset书写方式

```css
* { margin:0; padding:0; }
```

现在常用reset书写方式

```css
html, body, div, span, applet, object, iframe, 
h1, h2, h3, h4, h5, h6, p, 
blockquote, pre, a, abbr, acronym, address, big, 
cite, code, del, dfn, em, font, img, 
ins, kbd, q, s, samp, small, strike, 
strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, 
fieldset, form, label, legend, 
table, caption, tbody, tfoot, thead, tr, th, td, 
center, u, b, i { 
    margin: 0; 
    padding: 0; 
    border: 0; 
    outline: 0; 
    font-weight: normal; 
    font-style: normal; 
    font-size: 100%; 
    font-family: inherit; 
    vertical-align: baseline 
} 
body { 
    line-height: 1 
} 
:focus { 
    outline: 0 
} 
ol, ul { 
    list-style: none 
} 
table { 
    border-collapse: collapse; 
    border-spacing: 0 
} 
blockquote:before, blockquote:after, q:before, q:after { 
    content: “” 
} 
blockquote, q { 
    quotes: “” “” 
} 
input, textarea { 
    margin: 0; 
    padding: 0 
} 
hr { 
    margin: 0; 
    padding: 0; 
    border: 0; 
    color: #000; 
    background-color: #000; 
    height: 1px 
}}
```

- normalize.css：统⼀浏览器的默认样式，并不是完全去掉

> 左右布局：左边定宽、右边⾃适应，不少于3种⽅法

- 设置左边左浮动，右边的margin-left设置等于左边宽度
- 父元素设置flex布局，子左元素设置宽度，右子元素设置flex: 1
- 定位布局：父元素relative，子左元素设置absolute，设置宽度，设置`left: 0`，子右元素设置`width: 100%; height: 100%;`

> CSS3⽤过哪些新特性

垂直水平居中常⽤：`transform: translate(-50%, -50%)； transform-style: prevent-3d;`

> ⚠️BFC形成以及作⽤

- BFC (Block Formatting Contexts) （块级格式化上下文）是一种**普通流**的定位方案
- 具有 BFC 特性的元素可以看作是**隔离了的独立容器**，容器里面的元素不会在布局上影响到外面的元素
- 可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部

**触发BFC条件**：满足任一条件

- 浮动元素（float属性不为none）
- 绝对定位元素（position为absolute或fixed）
- ⾮块级元素（display为inline-block, table-cell, table-caption, flex, inline-flex）
- overflow不为visible（hidden、auto、scroll）
- body根元素

**作⽤**

- 清除浮动（overflow: hidden）
- 防⽌margin重叠塌陷
- 布局（左边固定，右边⾃适应）

> CSS的盒⼦模型、box-sizing

**W3C标准模型**

- 默认都是W3C标准模型，加上DOCTYPE确保是按W3C标准模型加载的
- width = content.width
- height = content.height
- 相当于box-sizing: content-box

**IE怪异模型**

- width = content.width + 2padding-left + 2border-left
- height = content.height + 2padding-top + 2border-top
- form中的input、radio、checkbox、button都是按照IE怪异模型来计算的
- 相当于box-sizing: border-box

> BEM与CSS Modules

- BEM的意思就是块（block）、元素（element）、修饰符（modifier），是⼀种CSS类的命名规范，为了解决**命名冲突**以及更好的**语义化**而生

```css
.form { }
.form--theme-xmas { }
.form--simple { }
.form__input { }
.form__submit { }
.form__submit--disabled { }
```

- CSS Modules默认是以**hash: base64**来进行**类名转换**的，**保证唯⼀**，但是需要配合打包⼯具来使用

> rem和em区别

- rem：是相对于根元素计算的，比如说根元素font-size: 16px, 则表示1rem=16px
- em：是相对于⽗元素计算的，比如说父元素font-size: 16px，则表示1em=16px

> ⚠️CSS动画怎么优化

**减少重排和重绘**


重绘和重排会在我们**设置节点样式**时频繁出现，同时也会很大程度上影响性能

- 重绘是当节点需要**更改外观**而**不会影响布局**的，比如改变 `color` 
- 重排是**布局**或者**几何属性**需要改变
- 重排**必定**会发生重绘，重绘**不一定**会引发重排
- 重排所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列重排

重绘和重排其实也和 Eventloop 有关

1. 当 Eventloop 执行完 Microtasks 后，会判断 `document` 是否需要更新，因为浏览器是 60Hz 的刷新率，每 16.6ms 才会更新一次
2. 然后判断是否有 `resize` 或者 `scroll` 事件，有的话会去触发事件，所以 `resize` 和 `scroll` 事件也是至少 16ms 才会触发一次，并且自带节流功能。
3. 判断是否触发了 media query
4. 更新动画并且发送事件
5. 判断是否有全屏操作事件
6. 执行 `requestAnimationFrame` 回调
7. 执行 `IntersectionObserver` 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
8. 更新界面
9. 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 `requestIdleCallback` 回调
 
**推荐使⽤**

- translate、opacity、scale、rotate这些属性
- 可以⽤translate3d强制开启gpu加速，但是会增加性能消耗，如果滥用反而会使动画变得更加卡

> ⚠️CSS实现⻓宽⽐固定的box

- 若div中只有img标签，且需要div按照图片长宽比自动缩放，则只需将img和div的height均设置为auto
- padding设置为百分比时，是以元素的宽度乘以百分比从而得到padding值的。所以在div的width为固定的情况下，设置height为0，使内容自然溢出，再通过设置`padding-bottom`使元素有一定高度，实现固定宽⾼的box

```css
.box{
    width: 50%;
    height: 0;
    padding-bottom: 30%;
    /*宽高比为5:3*/
    background-size: cover;
}
```

> CSS实现三角形

- 当一个div宽高为0时，设置border的话其实是4个三角形
- 当我们设置部分border的大小并设置部分border为透明时，就可以达到三角形的效果
- 比如说我要画一个底和高均为40px的等腰三角形用来做气泡框的那个三角，我就可以设置

```css
.div {
  width: 0;
  height: 0;
  /*三角形的高设置为有颜色*/
  border-bottom: 40px solid #ff0000;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```
# HTML

> ⚠️你是如何理解 HTML 语义化的

- 让合适的标签做合适的事，⽐如header代表头部、footer代表尾部
- ⻚⾯结构更加清晰
- 更好的SEO

> ⚠️DOMContentLoaded、load和document.readyState

DOM⽂档加载顺序

- 解析HTML结构
- 加载外部脚本和样式表⽂件
- 解析并执⾏脚本代码
- DOM树构建完成 -> DOMContentLoaded
- 加载图⽚等外部⽂件
- ⻚⾯加载完毕 -> load

readyState 属性返回当前⽂档的状态

- uninitialized * 还未开始载⼊
- loading * 载⼊中
- interactive * 已加载，⽂档与⽤户可以开始交互
- complete * 载⼊完成 DOMContentLoaded

> meta viewport 是做什么⽤的

设置视⼝⼤⼩和缩放的属性

> DOCTYPE有什么⽤

设置⽤来区别盒子模型是**W3C标准模式**还是**怪异模式**，⽤来告知浏览器使⽤**W3C标准模式**渲染⻚⾯

> HTML5新内容，使⽤过什么

- 我使⽤过`navigator.mediaDevices.getUserMedia()`⽅法，主要⽤来获取摄像头的视频流
- 返回的是⼀个promise对象，⼊参可以是`{ audio:true, video: true }`
- 成功返回可以设置

```js
video.srcObject = stream;
video.play();
```

- 关闭的话

```js
// 方法1
video.pause();
// 方法2
video.srcObject = null;
// 方法3
stream.getVideoTracks()[0].stop();
```

video可以设置多个参数

- 分辨率：`{video: {width:1280, height: 720}}`，可以⽤exact强制指定分辨率，如果摄像头不⽀持请求的或者更⾼的分辨率，返回的Promise会处于rejected状态
- 帧率：`{video: {frameRate: { ideal: 10, max: 15}}}`
- 前置或者后置摄像头：`{video: {facingMode: "user"}`，user代表前置，environment代表后置
- 该API只有在HTTPS下才可以调⽤，localhost或者本地file也可以调⽤，Electron特殊需求可以使⽤本地file

```html
<!DOCTYPE html>
<html lang="zh-cn">

  <head>
    <meta charset="UTF-8">
    <title>web调取摄像头</title>
  </head>

  <body>
    <video src=""></video>
    <script>
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        }
      }
      window.URL = (window.URL || window.webkitURL || window.mozURL || window.msURL);
      var mediaOpts = {
        audio: false,
        video: true,
      }
      function successFunc(stream) {
        var video = document.querySelector('video');
        if ("srcObject" in video) {
          video.srcObject = stream
        } else {
          video.src = window.URL && window.URL.createObjectURL(stream) || stream
        }
        video.play();
      }
      function errorFunc(err) {
        alert(err.name);
      }

      navigator.getUserMedia(mediaOpts, successFunc, errorFunc);
    </script>
  </body>

</html>
```

> input和textarea区别

- input是单⾏⽂本，单标签，需要指定 type 属性，⽀持的属性有： type 、 size 、 value等
- textarea是多⾏⽂本，是闭合标签，⽀持的属性有： row 、 col 等

> ⽤⼀个div模拟textarea的实现

HTML5有个属性叫`contenteditable`，将其设置为true

> 移动设备忽略将⻚⾯中的数字识别为电话号码的⽅法

设置meta标签： `<meta name="format-detection" content="telephone=no" />`

> script标签的defer和async区别

- 当 `script` 标签加上 `defer` 属性以后，表示该 JS 文件会并行下载，defer是**异步加载**，延后执⾏，会在HTML解析完毕之后，DOMContentLoaded之前执⾏，defer执⾏顺序按照script标签先后顺序执⾏，但是实际中不⼀定是按顺序的，可以把 `script` 标签放在任意位置
- 当`script` 标签加上 `async` 属性以后，表示该 JS 文件会并行下载并执行，不会阻塞渲染，async是**异步加载**，加载完⽴即执⾏，并且会和HTML解析并⾏执⾏，也就是说，执⾏脚本的时候会阻塞HTML解析，async执⾏顺序也不⼀定
- 如果 `script` 标签没有这些属性，就会阻塞住渲染流程直到 JS 执行完毕。遇到文件下载的会去下载文件，这也是都建议将 `script` 标签放在 `body` 标签底部的原因
- 如果使用 HTTP/2 协议的话会极大的提高多图的下载效率
