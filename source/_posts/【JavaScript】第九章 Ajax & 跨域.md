---
title: 【JavaScript】第九章 Ajax & 跨域
date: 2019-03-16 15:42:44
categories: JavaScript
typora-root-url: ..
typora-copy-images-to: ../images
---

> 1. 手动编写一个Ajax，不依赖第三方库
> 2. 跨域的几种实现方式

# XMLHttpRequest
---
- IE低版本使用ActiveXObject，和W3C标准不同
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/app', false); // false 异步
xhr.onreadystatechange = function () {
  // 这里的函数异步执行，可参考之前JS基础中的异步模块
  if (xhr.readyState == 4) {
    if (xhr.state == 200) {
      alert(xhr.responseText)
    }
  }
}
xhr.send(null)
```
# 状态码说明
---
xhr.readyState == 4
| 状态码 | 状态 | 说明 |
|--|--|--|
| 0 | 未初始化 | 还没有调用send()方法 |
| 1 | 载入 | 已调用send()方法，正在发生请求 |
| 2 | 载入完成 | send()方法执行完成，已接收到全部相应内容 |
| 3 | 交互 | 正在解析相应内容 |
| 4* | 完成 | 响应内容解析完成，可以在客户端调用了 |

xhr.status == 200
| 状态码 | 说明 |
|--|--|
| 2xx | 表示成功处理请求，如200 |
| 3xx | 需要重定向，浏览器直接跳转 |
| 4xx | 客户端请求错误，如404 |
| 5xx | 服务端错误 |

# 跨域
---
## 什么是跨域
浏览器有同源策略，不允许Ajax访问其他域接口

跨域条件
- 协议
- 域名
- 端口（HTTP默认80；HTTPS默认443）

有一个不同就算跨域
- http://www.yourname.com/page1.html
- http://m.imooc.com/course/ajaxcourserecom?cid45

但是有三个标签允许跨域加载资源
- `<img src = xxx>`用于打点统计，统计网站可能是其他域，防盗链
- `<link href = xxx>`、`<script src = xxx>`可以使用CDN，CDN的也是其他域
- `<script src = xxx>`script可以用于JSONP

注意事项：
- 所有跨域请求都必须经过信息提供方允许
- 如果未经允许即可获取，那是浏览器同源策略出现漏洞

## JSONP
### 实现原理
加载 http://codeing.m.imooc.com/classindex.html
- 不一定服务器端真正有一个classindex.html
- 服务器可以根据请求，动态生成一个文件，返回
- 同理于`<script src = 'http://coding.m.imooc.com/api.js'>`

例如你的网站要跨域访问慕课网的一个接口
- 慕课给你一个地址 http://coding.m.mooc.com/api.js
- 返回内容格式如`callpack({x:100, y:200})`（可动态生成）
```js
<script>
  window.callback = function (data) {
    // 这里是我们跨域得到的信息
    console.log(data)
  }
</script>
<script src="http://coding.m.imooc.com/api.js"></script>
```

### 服务器端设置http header
跨域趋势，简洁方法，服务端设置
```js
response.setHeader('Access-Control-Allow-Origin',"http://a.com")
response.setHeader('Access-Control-Allow-Headers','X-Requestd-Width')
response.setHeader('Access-Control-Allow-Method','PUT,POST,GET,DELETE,OPTIONS')
response.setHeader('Access-Control-Allow-Credentials','true') // 接受宽裕的cookie
```

# 题目解答
---
> 1. 手动编写一个Ajax，不依赖第三方库

> 2. 跨域的几种实现方式

- JSONP 
- 服务器端设置http header

