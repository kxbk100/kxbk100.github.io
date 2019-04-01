---
title: Hexo使用心得
date: 2019-04-01 22:06:32
categories:
typora-root-url: ..
typora-copy-images-to: ../images
---

# 新建文章
`hexo new "Hexo使用心得"`

# 上传图片到github并使用
1. 将`_config.yml`中有的`post_asset_folder`设置为`true`
1. 在`hexo`的目录下执行`npm install https://github.com/CodeFalling/hexo-asset-image --save`
1. 完成安装后用`hexo`新建文章的时候会发现`_posts`目录下面会多出一个和文章名字一样的文件夹
1. 使用```![test](Hexo使用心得/test.jpg)```就可以插入图片。其中`[]`里面不写文字则没有图片标题

# Hexo-admin
本地的文章编辑器，不支持在线`/admin`访问，`github.io`都是静态界面

# 更新文章
`hexo d -g`
