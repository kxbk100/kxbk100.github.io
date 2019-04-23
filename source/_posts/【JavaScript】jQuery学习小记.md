---
title: 【JavaScript】jQuery学习小记
date: 2019年04月08日 00:27:43
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

# 基本选择器
- `$("#id")`：id选择器，返回单个元素
- `$(".class")`：class选择器，返回**集合**元素
- `$("element")`：选定指定的元素名匹配的元素，返回**集合**元素
- `$("*")`：通配符选择器，选择所有元素，返回**集合**元素
- `$("selector1,selector2")`：选择所有选择器匹配的元素，返回**集合**元素

# 层次选择器
- `$("div span")`：选择`<div>`里的**所有**`<span>`后代元素，返回**集合**元素
- `$("div>span")`：选择`<div>`下的`<span>`子元素，只寻找一级（第一代子元素），`<span>`中的`<span>`不会找到，而上述则全部找到
```html
<div>
  <span id="span1"></span>
  <span id="span2">
    <span id="span3"></span>
  </span>
</div>
<!-- div span 选取的结果是{span1,span2,span3} -->
<!-- div > span 选取的结果是{span1,span2} -->
```
- `$("#one+div")`：获取**紧接**在`one`后面的**一个**同辈`div`元素，等同于`$(#one).next("div")`
- `$(#one).prev("div")`获取**紧接**在`one`前面的**一个**同辈`div`元素
- `$("#one~div")`：获取`one`后面的**所有**同辈`div`元素，等同于`$(#one).nextAll("div")`
- `$(#one).siblings("div")`：获取`one`的元素的所有`div`同辈元素 **（不管前后）**

所以 获取元素范围大小顺序依次为：
- `$(#one).siblings("div")>$("#one~div")>$("#one +div")`
- `$(#one).siblings("div")>$(#one).nextAll("div")>$(#one).next("div")`


# 基本过滤选择器
- `:first`：选取第一个元素，返回单个元素
- `:last`：选取最后一个元素，返回单个元素
- `:not(selector)`：去除所有给定选择器所匹配的元素，返回**集合**元素
- `:even`：选取索引为**偶数**的所有元素，索引号从**0**开始，返回**集合**元素
- `:odd`：选取索引为**奇数**的所有元素，索引号从**0**开始，返回**集合**元素
- `:eq(index)`：选取索引等于`index`的元素，`index`从**0**开始返回单个元素
- `:gt(index)`：选取索引号大于`index`的所有元素,返回**集合**元素
- `:lt(index)`：选取索引小于`index`的所有元素，返回**集合**元素
- `:header`：选取所有的标题元素，返回**集合**元素
- `:animated`：选取正在执行动画的元素，返回**集合**元素
- `:focus`：选取当前获取焦点的元素，返回**集合**元素

# 内容过滤选择器
- `:contains(text)`：选取含有文本内容为`text`的元素，返回**集合**元素
- `:empty`：选取没有子节点或者文本的空元素，返回**集合**元素
- `:has(selector)`：选取含有选择器所匹配的元素的元素，返回**集合**元素
- `:parent`：选取含有子节点或者文本的元素，返回**集合**元素

# 可见性过滤选择器
- `:hidden`：选取所有不可见的元素，返回**集合**元素
- `:visible`：选取所有可见的元素，返回**集合**元素

# 属性过滤选择器
- `[attribute]`：选取含有此属性的元素，返回**集合**元素
- `:[attribute=value]`：选取属性的值为`value`的元素，返回**集合**元素
- `:[attribute!=value]`：选取属性的值不为`value`的元素，返回**集合**元素
- `:[attribute^=value]`：选取属性的值以`value`开始的元素，返回**集合**元素
- `:[attribute$=value]`：选取属性的值以`value`结尾的元素，返回**集合**元素
- `:[attribute*=value]`：选取属性的值含有`value`的元素，返回**集合**元素
- `:[attribute|=value]`：选取属性的值等于`value`或者是以`value`为前缀（即`value-`，`value`后面跟一个连字符）的元素，返回**集合**元素
- `:[attribute~=value]`：选取属性的值以空格分隔的值中含有`value`的元素，返回**集合**元素
- `:[attribute1][attribute1]...[attributeN1]`：用多个属性选择器合并成一个复合属性选择器，返回**集合**元素

# 子元素过滤选择器
- `:nth-child(index/even/odd)`：选取父元素下的第`index`个子元素，`index`值从**1**开始，或者选取奇偶子元素,返回**集合**元素
- `:first-child`：选取父元素下的第一个元素，返回**集合**元素
- `:last-child`：选取父元素下的最后一个子元素，返回**集合**元素
- `:only-child`：如果元素是父元素的唯一的元素，则选择，否则，不选择，返回**集合**元素
- `:nth-child()`还可以通过数学表达式选取一组特定的元素，如:`:nth-child(3n)`：选取父元素下所有`3`的倍数的子元素（`n`从`1`开始，即选取第`3，6，9，...`个元素）

# 表单选择器
- `:input`：选取所有的`input、textarea、select、button`元素，返回**集合**元素
- `:text`：选取所有单行文本框，返回**集合**元素
- `:password`：选取所有的密码框，返回**集合**元素
- `:radio`：选取所有的单选框，返回**集合**元素
- `:checkbox`：选取所有的多选框，返回**集合**元素
- `:submit`：选取所有提交按钮，返回**集合**元素
- `:image`：选取所有的图像按钮，返回**集合**元素
- `:reset`：选取所有的重置按钮，返回**集合**元素
- `:button`：选取所有的按钮，返回**集合**元素
- `:file`：选取所有的上传域，返回**集合**元素

# 表单对象属性过滤选择器
- `:enabled`：选取所有可用元素，返回**集合**元素
- `:disabled`：选取所有不可用元素，返回**集合**元素
- `:checked`：选取所有被选中的元素（**单选框和多选框**），返回**集合**元素
- `:selected`：选取所有被选中的元素（**下拉列表**），返回**集合**元素

# 查找、设置、删除属性
- `attr()`方法：接受一个或两个参数，一个参数是获取属性值，两个参数是设置属性,需要设置多个属性时，`attr`方法的参数可以是一个由属性和属性值组成的json数据格式
```javascript
$("div").attr("background");//获取属性值
$("div").attr("background","blue");//设置属性值
$("div").attr({"background":"blue","height":"200px"});//设置多个属性值
```

- `css()`方法：接受一个或两个参数，当一个参数是属性名时，获取属性值，当两个参数时，设置属性第一个参数为属性名，第二个参数为属性值，需要设置多个属性时，`css`方法的参数可以是一个由属性和属性值组成的json数据格式
```javascript
$("div").css("background");//获取属性值
$("div").css("background","blue");//设置属性值
$("div").css({"background":"blue","height":"200px"});//设置多个属性值
```
> 另外`width()`方法和`height()`方法可以直接获取宽度和高度

- `addClass()`：为元素添加`class`值，可批量添加属性与值
```javascript
$("div").addClass("myclass");
```

- `removeAttr()`：删除指定的属性
```javascript
$("div").removeAttr("background");
```

- `removeClass()`：有参数时，删除指定的`class`值，没有参数时，删除全部的`class`值
```javascript
$("div").removeClass("myclass");
$("div").removeClass();
```

- `hasClass()`：判断匹配的元素是否有某个`class`值，有则返回`true`，没有则返回`false`
```javascript
$("div").hasClass("myclass");
```

# 创建元素、文本、属性节点
- 均可以直接将元素、文本、属性添加到`$()`方法中，如：
```javascript
var p=$("<p title='mytitle'>假装是标题</p>")
```

# 插入节点
- `append()`：向元素内部添加节点，如：
```html
<p>我是内容</p>
```
```javascript
$("p").append("<span>我是追加的内容</span>");
```
结果：
```html
<p>我是内容<span>我是追加的内容</span></p>
```

- `appendTo()`：将元素添加到指定元素内部，即将`append`方法中的链式操作的成员互换位置
```html
<p>我是内容</p>
```
```javascript
$("<span>我是追加的内容</span>").appendTo("p");
```
结果：
```html
<p>我是内容<span>我是追加的内容</span></p>
```

- `prepend()`：向元素内部前置内容
```html
<p>我是内容</p>
```
```javascript
$("p").prepend("<span>我是追加的内容</span>");
```
结果：
```html
<p><span>我是追加的内容</span>我是内容</p>
```

- `prependTo()`：将节点前置到指定元素中，即将`prepend`方法中的链式操作中的成员互换位置
```html
<p>我是内容</p>
```
```javascript
$("<span>我是追加的内容</span>").prependTo("p");
```
结果：
```html
<p><span>我是追加的内容</span>我是内容</p>
```

- `after()`：在每个元素节点后添加节点
```html
<p>我是内容</p>
```
```javascript
$("p").after("<span>我是追加的内容</span>");
```
结果：
```html
<p>我是内容</p><span>我是追加的内容</span>
```

- `insertAfter()`：讲节点插入到指定节点之后，即将`after`方法中的链式操作中的成员互换位置
```html
<p>我是内容</p>
```
```javascript
$("<span>我是追加的内容</span>").insertAfter("p");
```
结果：
```html
<p>我是内容</p><span>我是追加的内容</span>
```

- `before()`：再节点前面插入节点
```html
<p>我是内容</p>
```
```javascript
$("p").before("<span>我是追加的内容</span>");
```
结果：
```html
<span>我是追加的内容</span><p>我是内容</p>
```

- `insertBefore()`：将节点插入到指定元素前面
```html
<p>我是内容</p>
```
```javascript
$("<span>我是追加的内容</span>").insertBefore("p");
```
结果：
```html
<span>我是追加的内容</span><p>我是内容</p>
```

# 删除节点
- `remove()`：从`DOM`中删除所有匹配的元素，同时该节点所包含的所有后代节点将同时被删除，因为返回值是删除节点的引用，因此可以在以后继续使用这些元素，但是此时这些节点所绑定的事件也会删除，如：
```javascript
var $li=$("ul li:eq(1)").remove();//删除节点
$li.appendTo("ul");//将节点添加回去
```

- `detach()`：和`remove()`几乎一样，不同的是`detach`方法不会删除节点所绑定的事件和附加的数据

- `empty()`：清空所匹配的节点
```javascript
$("ul li:eq(1)").empty();//此时第一个li标签内无任何内容及节点了
```

# 复制节点
- `clone()`：复制节点，可以有参数`true`，当有`true`参数时，将同时**复制节点所绑定的事件**，如：
```javascript
$("ul li:eq(1)").clone(true).apppendTo("ul");
```

# 替换节点
- `replaceWith()`：将匹配的节点替换成指定的节点
```javascript
$("p").replaceWith("<ul><li></li></ul>");
```

- `replaceAll()`：用指定的节点替换相应节点，即将`replaceWith`方法中的链式操作中的成员互换位置
```javascript
$("<ul><li></li></ul>").replaceAll("p");
```

# 包裹节点
- `wrap()`：将匹配的节点用指定的节点单独包裹起来
```html
<p>我是内容</p>
<p>我是另一个内容</p>
```
```javascript
$("p").wrap("<span></span>");
```
结果：
```html
<span><p>我是内容</p></span>
<span><p>我是另一个内容</p></span>
```

- `wrapAll()`：将匹配的节点用指定的节点全部包裹起来
```html
<p>我是内容</p>
<p>我是另一个内容</p>
```
```javascript
$("<span></span>").wrapAll("p");
```
结果：
```html
<span>
  <p>我是内容</p>
  <p>我是另一个内容</p>
</span>
```

- `wrapInner()`：将匹配的节点**内部的节点**或者**文本内容**用指定的节点包裹起来
```html
<p>我是内容</p>
```
```javascript
$("p").wrapInner("<span></span>");
```
结果：
```html
<p><span>我是内容</span></p>
```

# 设置、获取文本、`HTML`和值
- `html()`：类似于原生`JavaScript`中的`innerHTML`属性，不含参数时是获取，包含元素节点和文本节点，当内有字符串参数时，是重新设置节点内容和文本内容
```javascript
$("p").html();
```

- `text()`：类似于原生`JavaScript`中的`innerText`属性，不含参数时是获取文本节点，当内有字符串参数时，是重新设置文本内容
```javascript
$("p").text("我是内容");
```

- `val()`：类似于原生`JavaScript`中的`value`属性，可以用来获取和设置元素的值，无论是元素或者文本框，下拉列表或者单选框，**如果元素是多选，则返回一个包含所有选择的值的数组**

# 遍历节点
- `children()`：获取所有的子元素集合，返回一个**数组**，只考虑**直接子元素**，不考虑其他后代元素
```html
<div>
  <p>我是内容
    <span>我是内嵌的内容</span>
  </p>
  <p>我是另一个内容</p>
</div>
```

```javascript
var $div = $("div").children();
$div.length;//返回2，不是3，只包含直接子元素，不包含span
```

- `next()`：获取匹配元素后面紧邻的**一个**同辈元素，效果类似于`$("prev+next")`
```html
<div>
  <p>我是内容</p>
  <h1>我是另一个内容</h1>
</div>
```
```javascript
var $h1=$("p").next();//返回h1元素节点
```

- `prev()`：获取匹配元素前面紧邻的**一个**同辈元素
```html
<div>
  <h1>我是另一个内容</h1>
  <p>我是内容</p>
</div>
```
```javascript
var $h1=$("p").prev();//返回h1元素节点
```

- `siblings()`：获取匹配元素的前后**所有**的同辈元素
```html
<div>
  <h1>我是另一个内容</h1>
  <p>我是内容</p>
  <ul>我是列表</ul>
</div>
```
```javascript
var $h1=$("p").next();//返回h1和ul元素节点集合
```

- `closest()`：获取最近的符合匹配的一个父元素
```html
<div>
  <div class="div2">
    <p>我是内容</p>
  </div>
</div>
```
```javascript
var $div=$("p").closest();//返回class为div2的div元素
```

- `parent()`：获取一个父元素
```html
<div>
  <div class="div2">
    <p>我是内容</p>
  </div>
</div>
```
```javascript
var $div=$("p").parent();//返回class为div2的div元素
```

- `parents()`：获取所有匹配的一个祖先元素
```html
<div>
  <div class="div2">
    <p>我是内容</p>
  </div>
</div>
```
```javascript
var $div=$("p").parents();//返回两个div元素组成的数组
```

# 元素定位
- `offset()`：获取元素在当前视窗的相对偏移，返回一个对象，对象包含`top`和`left`两个属性
```html
<div>我是内容</div>
```
```javascript
var $offset=$("div").offset();
var left=$offset.left;
var top=$offset.top;
```

- `position()`：获取元素相对于最近的一个`position`样式属性设置为`relative`或者`absolute`的祖父节点的相对偏移，返回一个对象，对象包含`top`和`left`两个属性
```html
<div style="position:relative">
  <div><p>我是内容</p></div>
</div>
```
```javascript
var $position=$("p").position();
var left=$position.left;
var top=$position.top;
```

- `scrollTop()`：获取元素的滚动条距离顶端的距离

- `scrollLeft()`：获取元素的滚动条距离左侧的距离

# 加载`DOM`
- `$(document).ready()`：和原生的`JavaScript`的`window.onload()`方法有类似的功能，`window.onload()`方法是在网页中所有的元素（包括元素的所有关联文件）完全加载到浏览器后才执行，而`$(docuemnt).ready()`在`DOM`完全就绪时就可以被调用，此时并不意味着这些关联文件都已经下载完毕；另外，`$(document).ready()`可多次使用，而`window.onload()`只能用一次，多次使用时会出现覆盖的现象，另外其可以简写成`$().ready()`;

# 事件绑定
- `bind()`：可以有三个参数，第一个参数是事件类型，第二个参数可选，作为`event.data`属性值传给事件对象的额外数据对象，第三个参数是处理函数
```javascript
bind(type data fn);
```
- `on()`函数来绑定事件 
> 常见的事件类型：
`blur`、`focus`、`load`、`resize`、`scroll`、`unload`、`click`、`dbclick`、`mousedown`、`mouseup`、`mouseover`、`mousemove`、`mouseout`、`mouseenter`、`mouseleave`、`change`、`select`、`submit`、`keydown`、`keyup`、`error`
> 另外，像`click`、`mouseover`、`mouseout`这类常用的事件，可以简写，如下：
```javascript
$(function(){
  $("h1").mouseover(function(){
    $(this).next().show()
  }).mouseout(function(){
    $(this).next().hide()
  })
})
```

# 合成事件
`jQuery`中有两个合成事件——`hover()`和`toggle()`方法
- `hover()`：用于模拟光标悬停事件，当光标移动到元素时，会触发第一个函数，离开时触发第二个函数，语法
```javascript
hover(enter,leave);
```
- `toggle()`：用于模拟鼠标连续点击事件，语法
```javascript
toggle(fn1,fn2,...,fn);
```

# 阻止事件之外的额外问题
- 停止事件冒泡：用`stopPropagation()`方法来停止事件冒泡，如：
```javascript
$("span").bind("click",function(event){
  //事件处理程序
  event.stopPropagation()
})
```
- 阻止默认行为：用`preventDafault()`方法来阻止默认行为，当然也可以用原生`JavaScript`中的`return false`，如：
```javascript
$("a").bind("click",function(event){
  //事件处理程序
  event.preventDafault();
  //或者return false;
})
```
- 事件捕获：事件捕获与事件冒泡是刚好两个相反的过程，`jQuery`不支持事件捕获。

# 事件对象
- 添加事件对象非常简单，只需要为函数添加一个参数，一般会用`event`
```javascript
$("a").bind("click",function(event){
  //事件处理程序
})
```

- `event.type`：获取事件的类型
```javascript
$("a").bind("click",function(event){
  alert(event.type);
})
```
- `event.target`：获取触发事件的对象元素
```javascript
$("a").bind("click",function(event){
  alert(event.target.href);
})
```
- `event.pageX`和`event.pageY`：获取光标相对于页面的`x`坐标和`y`坐标
```javascript
$("a").bind("click",function(event){
  alert(event.pageX);
  alert(event.pageY);
})
```
- `event.which`：在鼠标单击时获取到鼠标的左、中、右键；在键盘事件中获取到键盘的按键
```javascript
$("a").mousedown(function(event){
  alert(event.which);
})
$("a").keyup(function(event){
  alert(event.which);
})
```
- `event.metaKey`：在键盘事件中获取`ctrl`按键

# 移除事件
- `unbind()`：没有参数时，删除所有的绑定事件，可以有两个参数，第一个参数是事件类型，第二个参数是将要移除的函数，提供了事件类型，则只删除该事件类型，提供了事件处理函数，则只有这个事件处理函数会被删除，语法结构如下
```javascript
unbind(type,data)
$("a").click(function(){
  $("#btn").unbind("click",fn1);
}
```
- 另外，对于只需要触发一次随后就立即解除绑定的情况，`jQuery`提供了`one()`方法，这个方法可以为元素绑定处理函数，当函数触发一次后，立即被删除

# 事件的其他用法
- 模拟操作：`trigger()`：此方法可以模拟操作，例如
```javascript
$("#btn").triggle("click")；
```
> 这段代码可以触发`id`为`btn`的按钮的`click`事件，`trigger()`方法会触发浏览器的默认事件，如果不想执行浏览器的默认操作，可以使用`jQuery`中的另一个方法`triggerHandler()`方法

- 绑定多个事件类型：`bind`可以为元素绑定多个事件类型
```javascript
$(function(){
  $("div").bind("mouseover mouseout",function(){
    $(this).toggleClass("over");
  });
})
```
> 这段代码效果和下方代码一样
```javascript
$(function(){
  $("div").bind("mouseover",function(){
    $(this).toggleClass("over");
  }).bind("mouseout",function(){
    $(this).toggleClass("over")；
  });
})
```

# 动画
- `show()`和`hide()`：这两个是`jQuery`中的最基本的动画，当这两个方法不含参数时，效果类似于直接将元素的`display`属性分别改为`block`和`none`，这两个方法当有参数时，可以使元素慢慢显示出来，速度关键字有`slow`、`normal`、`fast`，此外，还可以直接指定一个数字作为显示的时间参数，单位为毫秒，其中`slow`的显示时间为`600`毫秒，`normal`的显示时间为`400`毫秒，`fast`的显示时间为`200`毫秒，这两个方法是同时改变元素的高度、宽度和不透明度
```javascript
$("p").toggle(function(){
  $(this).next().hide(600);
},function(){
  $(this).next().show(600);
})
```
- `fadeIn()`和`fadeOut()`：这两个函数只改变元素的不透明度，同样可以有以上的速度参数
```javascript
$("p").toggle(function(){
  $(this).next().fadeOut();
},function(){
  $(this).next().fadeIn(600);
})
```
- `slideUp()`和`slideDown()`：这两个方法只改变元素的高度，`slideDown()`方法使元素由上到下延伸展示，而`slideUp()`方法使元素从下到上缩短隐藏，同样有上述的时间参数
```javascript
$("p").toggle(function(){
  $(this).next().slideUp();
},function(){
  $(this).next().slideDown(600);
})
```

- `toggle()`：切换元素的可见状态，如果元素可见，则切换为隐藏，如果元素隐藏，则切换为可见
```javascript
toggle(speed,callback);
$(this).next().toggle();
```
> 效果和`hide()`和`show()`方法类似

- `slideToggle()`：通过高度来切换元素的可见性
```javascript
slideToggle(speed,easing,callback);
```

- `fadeTo()`：把元素的不透明度以渐进的方式调整到指定的值，这个动画只调整元素的不透明度
```javascript
fadeTo(speed,opacity,callback)
$(this).fadeTo(100,0.3);
```

- `fadeToggle()`：通过不透明度来切换元素的可见性
```javascript
fadeToggle(speed,easing,callback);
```

- `animate()`：自定义动画
```javascript
animate(params,speed,callback);
params：一个包含样式属性及值的映射，如：{left:"400px",height:"500px"}
speed：速度参数，可选
callback：在动画完成后执行的函数，可选
```
- `animate`可以添加累加与累减动画，如：
```javascript
$(function(){
  $("p").click(function(){
    $(this).animate({left:"+=500px"},300)
  });
});
```
- 利用`animate`中的第一个参数很容易实现同时执行多个动画的效果，而需要按顺序执行动画，只需要顺序写`animate`动画即可，另外也可以使用链式操作
```javascript
$(this).animate({left:"500px"},300);
$(this).animate({height:"500px"},300);
```
等效于
```javascript
$(this).animate({left:"500px"},300).animate({height:"500px"},300);
```

# 判断元素是否处于动画状态
```javascript
if(!$("p").is(":animated")){
  //没有处于动画状态时执行的程序
}
```
# 延迟动画
- 延迟动画利用`delay()`方法
```javascript
$(this).animate({left:"500px"},200).delay(1000);
```
