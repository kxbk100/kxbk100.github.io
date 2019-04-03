---
title: 【CSS】Bootstrap学习小记
date: 2019-03-06 20:29:02
categories: CSS
typora-root-url: ..
typora-copy-images-to: ../images
---

# Bootstrap引入
```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>贴吧后台管理页面</title>
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <script src="../js/jquery.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
</head>

<body>
    <!-- 页眉 -->
    <header>
        <!-- 导航条部分 -->
        <nav>
            ...
        </nav>
    </header>
    <!-- 主要内容 -->
    <div class="container">
        <div class="row">
            <!-- 左侧目录 -->
            <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                ...
            </div>
            <!-- 右侧主要内容 -->
            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                ...
            </div>
        </div>
    </div>
    <!-- 页尾 -->
    <footer>
        ...
    </footer>
</body>

</html>
```

# 制作一个页面的流程
1. 引入框架
1. 实现页面布局代码
1. 构建导航的整体架构
1. 设计标题和导航链接
1. 设计搜索框和通知系统
1. 设置管理员登录系统
1. 设计响应式导航
1. 左侧边栏设计
1. 页面主体设计

# span1/2/3/4

# ul.unstyled

# ul.inline

# 响应式导航条

# Glyphicons <span>或者<a>

# 动态模态对话框

# 滚动监听

# 工具提示框

# 弹出框

# 状态按钮
- 加载中...

# 折叠

# 幻灯

# 视频响应式
```html
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="iqiyi.catilog2015/24551221.swf"></iframe>
</div>
```

# 扁平化风格页面

# 各种风格的按钮

# jQuery插件DataTables响应式表格
- 支持及时分页、搜索、排序
- `Json`、数组、`Ajax`

# 可视化图表ECharts

# jQuery UI Bootstrap工具
