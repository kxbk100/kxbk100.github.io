---
title: 【JavaScript】第十一章 开发环境
date: 2019-03-23 02:43:38
categories:
typora-root-url: 【JavaScript】第十一章 开发环境
typora-copy-images-to: 【JavaScript】第十一章 开发环境
---

# 关于开发环境
---
- 面试官放通过开发环境了解面试者的经验
- 开发环境最能体现工作产出效率
- 会以聊天的形式为主，而不是出具体的问题
- IDE（开发工具，写代码的效率）
- Git（代码版本管理，多人协作开发）
- JS模块化
- 打包工具
- 上线回滚的流程

# IDE
---
- webstorm
- sublime
- vscode
- atom
- 插件

# Git
---
- 正式项目都需要代码版本管理
- 大型项目需要多人协作开发
- Git和linux是一个作者
- 网络Git服务器，如 coding.net 和 github.com
- 一般公司代码非开源，都有自己的Git服务器
- 搭建Git服务器无需了解太多

Git的基本操作必须很熟练
| 命令 | 说明 |
|--|--|
| git status | 查看状态 |
| git diff | 查看两个文件的不同 |
| git checkout xxx (file name) | 发现自己改错了，需要还原 |
| git add . | 将所有修改的东西全部囊括进来 |
| git commit -m "xxx" | 修改的内容提交到本地仓库，-m代表添加的备注 |
| git push origin master | 提交到远程仓库 |
| git pull origin master | 别人修改代码，从远程下载已修改的代码 |
| git clone | 克隆新的项目 |
| git branch | 查看当前分支 |
| git checkout -b xxx | 新建一个分支 |
| git checkout xxx (branch name) | 切换到一个已有的分支 |
| git merge xxx | 合并分支 |

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190321231209609.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2t4YmsxMDA=,size_16,color_FFFFFF,t_70)

```
echo "# test" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:kxbk100/test.git
git push -u origin master
```

# 模块化
---
## 不使用模块化
- 依赖层级引用关系
- 代码中的函数必须是全局变量，才能暴露给使用方面，所以全局变量污染，不清楚各个文件间的依赖关系
- a.js知道要引用a-util.js，但是不知道其还需要依赖util.js

util.js
```js
function getFormatDate(date, type) {
  // type === 1 返回 2017-06-15
  // type === 2 返回 2017年6月15日
  // ...
}
```
a-util.js
```js
function aGetFormatDate(date) {
  // 要求返回 2017年6月15日 格式
  return getFormatDate(date, 2);
}
```
a.js
```js
var dt = new Date();
console.log(aGetFormatDate(dt));
```
date.html
- 顺序不能颠倒
- 3个文件之间是强依赖关系
```html
<script src="util.js"></script>
<script src="a-util.js"></script>
<script src="a.js"></script>
```

## 使用模块化
- 只往外s输出1个函数
- 在另一个文件中再接收
- 直接`<script src="a. js"></script>` ，其他的根据依赖关系自动引用
- 前2个函数，没必要做成全局变量，不会带来污染和覆盖

util.js
```js
export {
  getFormatDate: function(date, type) {
    // type === 1 返回 2017-06-15
    // type === 2 返回 2017年6月15日
    // ...
  }
}
```
a-util.js
```js
var getFormatDate = require('util.js');
export {
  aGetFormatDate: function (date) {
    // 要求返回 2017年6月15日 格式
    return getFormatDate(date, 2)
  }
}
```
a.js
```js
var aGetFormatDate = require('a-util.js');
var dt = new Date();
console.log(aGetFormatDate(dt));
```

## AMD
---
- 异步模块定义
- require.js
- 全局定义define函数
- 全局定义require函数
- 依赖js会自动、异步加载，不使用就不加载，提升性能
- return一个对象
- 只有先define才能被require

util.js
```js
define(function () {
  return {
    getFormateDate: function (date, type) {
      if (type == 1) {
        return '2017-06-15'
      }
      if (type == 2) {
        return '2017年6月15日'
      }
    }
  }
})
```
a-util.js
```js
define(['./util.js'], function (util) {
  return {
    aGetFormatDate: function(date) {
      return util.getFormatDate(date, 2);
    }
  }
});
```

a.js
```js
define(['./a-util.js'], function(aUtil) {
  return {
    printDate: function (date) {
      console.log(aUtil.aGetFormatDate);
    }
  }
}) 
```
main.js
```js
require(['./a.js'], function (a) {
  var date = new Date();
  a.printDate(date)
})
```
main.html
```html
<script src="/require.min.js" data-main="./main.js"></script> // 定义程序入口
```


---
a.js
```js
define(['./util.js'], function (util) {
  return {
    aGetFormateDate: function (date) {
      return util.getFormateDate();
    }
  }
})
```

main.js
```js
define(['./a.js'], function (a) {
  return {
    printDate: function (date) {
      console.log(autil.aGetFormateDate(date))
    }
  }
})
```


## CommonJS
- nodejs模块化规范，现在被大量用于前端
- 前端开发依赖的插件和库，都可以从npm中获取
- 构建工具的高度自动化，使得使用npm的成本非常低
- CommonJS不会异步加载JS，而是同步一次性加载进来
- exports输出出一个东西，var require接收一个东西

util.js
```js
module.exports = {
  getFormateDate: function (date, type) {
    if (type == 1) {
      return '2017-06-15'
    }
    if (type == 2) {
      return '2017年6月15日'
    }
  }
}
```

a-uril.js
```js
var util = require('util.js');
module.export = {
  aGetFormateDate: function (date) {
    return util.getFormateDate(date, 2);
  }
}
```

## AMD和CommonJS的使用场景
- 需要异步加载，用AMD
- 不需要异步加载JS，用CommonJS
- 使用npm之后使用CommonJS

# 构建工具(对模块化的代码打包和压缩)
---
构建工具
- grunt（没人用）
- gulp
- fis3
- webpack

构建的意义
- 模块化打包
- 支持CommonJS
- CommonJS受nodeJS支持
- 后端放到前端来用需要兼容
- webpack封装了很多方法，支持通过CommonJS的方式来运行在前端

安装 -> 配置 -> 处理一个简单事例 -> 得到结果
## 安装nodeJS
1. 安装Node.js
1. 进入文件目录
2. 初次使用安装http-server `sudo npm install http-server -g`
3. 使用`http-server -p 8881`生成服务
这个服务只能针对静态页面的编辑，nodejs或者php的修改无法使用

## 安装webpack
1. 进入文件目录
2. 初始化环境`npm init`
3. 自动生成package.json文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019032212273325.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2t4YmsxMDA=,size_16,color_FFFFFF,t_70)
4. 安装包`npm install webpack --save-dev`，`-dev`表示仅用于开发环境
5. 安装包`npm install jquery --save`，任何环境都需要
6. 卸载包`npm uninstall moment --save`

## 配置webpack
1. 新建webpack.config.js，与index.html和package.json同级
```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'), // __dirname：前端目录
  entry: {
    app: './app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
}
```
2. 新建src文件夹，在其中创建app.js入口文件
3. 在package.json的script中新增
```json
"start": "webpack" // 将start指定为webpack
```
4. 在index.html中，引入bundle.js
5. 访问页面

## 使用jQuery
1. 在app.js中添加
```js
var $ = require('jquery'); // 它会从package.js中的dependencies中查找安装的juqery
```
2. 自己写模块可以根据相对路径获取
```js
var aUtil = require('./a-util.js')
```
3. `npm start`打包

##  压缩jQuery
1. 安装UglifyJS Webpack Plugin
```
$ npm install uglifyjs-webpack-plugin --save-dev
```
2. 修改webpack.config.json如下
```js
var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'), // __dirname：前端目录
  entry: {
    app: './app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  //压缩js
  optimization: {
    minimizer: [
      new uglifyJsPlugin({
        uglifyOptions: {
          compress: false
        }
      })
    ]
  }
}
```
3. `npm start`打包
# 上限回滚流程
## 介绍
- 是非常重要的开发环节
- 各个公司的具体流程不同
- 由专门的工具负责系统完成，我们无需关心细节
- 如果没有参与过，面试时也要说出要点
- 只讲要点，具体实现无法讲解

## 上线和回滚的基本流程
上线
- 将测试完成的代码提交到git版本库的master分支
- 将当前服务器的代码全部打包并记录版本号（1.0），备份
- 将master分支的代码提交到服务器覆盖到线上服务器，生成新版本号（1.1）

回滚
- 将当前服务器的代码打包并记录版本号（1.1），备份
- 将备份的上一个版本号解压（1.0），覆盖到线上服务器，并生成新的版本号（1.2）

## linux基本命令
- 服务器使用Linux居多，server版，只有命令行
- 测试环境要匹配线上环境，因此也是Linux
- 经常需要登录测试机来自己配置，获取数据

常用命令
- mkdir a 
- ls
- ll
- cd a
- pwd 查看路径
- rm -rf a
- vi a.js
输入：i
保存：esc :w
退出：esc :q
保存并退出：esc :wq
- cat a.js 查看文件
- cp a.js a1.js 拷贝
- mv a1.js src/a1.js
- rm a.js
