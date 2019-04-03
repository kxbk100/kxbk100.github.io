---
title: Android学习小记
date: 2019-04-01 09:58:37
categories:Back-End
typora-root-url: ..
typora-copy-images-to: ../images
---

# 禁止Android不跟随屏幕密度加载不同文件夹的资源
在AndroidManifest.xml文件中添加android:anyDensity="false"字段

# 高分辨率，一般我们把图片丢这里mipmap-hdpi

# 调试时默认生成的apk在：app/build/outputs/apk目录下

# Android Studio 打包时 Signature Version V1 V2
- 同时勾选V1和V2则所有机型都没问题
- 生成目录 E:\wamp64\www\EAider\app\release

# 发布apk做代码混淆 爱加密

# match_parent和fill_parent
- fill_parent = match_parent（一般用match_parent）
- wrap_content设置一个视图的尺寸为wrap_content将强制性地使视图扩展以显示全部内容。以TextView和ImageView控件为例，设置为wrap_content将完整显示其内部的文本和图像。布局元素将根据内容更改大小。设置一个视图的尺寸为wrap_content大体等同于设置Windows控件的Autosize属性为True。

# layout_gravity和gravity
- `android:gravity`属性是对该`view`中内容的限定，比如一个button上面的text，你可以设置该text相对于view的靠左，靠右等位置
- `android:layout_gravity`是用来设置该view相对与父view的位置，比如一个button在linearlayout里，你想把该button放在linearlayout里靠左、靠右等位置就可以通过该属性设置 
- `android:gravity`用于设置View中内容相对于View组件的对齐方式
- `android:layout_gravity`用于设置View组件相对于Container的对齐方式

# 线性布局
- 权重用途很大
- 当`android:orientation="vertical"`时，只有水平方向的设置才起作用，垂直方向的设置不起作用。即：`left,right,center_horizontal`是生效的
- 当`android:orientation="horizontal"`时，只有垂直方向的设置才起作用，水平方向的设置不起作用。即：`top,bottom,center_vertical`是生效的

# 分隔线
```xml
<View
    android:layout_width="match_parent"
    android:layout_height="1px"
    android:background="#000000"/>
```

# 布局使用`RelativeLayout+LinearLayout`的`weight`属性搭配使用

# 相对布局广告弹出框Demo
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/RelativeLayout1"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#00CCCCFF">

    <ImageView
        android:id="@+id/img1"
        android:background="#000"
        android:layout_centerInParent="true"
        android:layout_width="200dp"
        android:layout_height="200dp" />

    <ImageView
        android:id="@+id/imgCancle"
        android:layout_alignRight="@id/img1"
        android:layout_alignTop="@id/img1"
        android:background="#5555"
        android:layout_marginTop="-15dp"
        android:layout_marginRight="-10dp"
        android:layout_width="28dp"
        android:layout_height="28dp" />
</RelativeLayout>
```

# 表格布局

# 帧布局FrameLayout
- `android:foreground`:设置改帧布局容器的前景图像
- `android:foregroundGravity`:设置前景图像显示的位置

# 网格布局GridLayout
- 默认每个组件都是占一行一列
- 通过`android:layout_rowSpan`与`android:layout_columnSpan`设置了组件横跨多行或者多列的话，如果你要让组件填满横越过的行或列的话，需要添加`android:layout_gravity = "fill"`

# 低版本sdk如何使用GridLayout
`<android.support.v7.widget.GridLayout>`，`v7`包一般在`sdk`下的`sdk\extras\android\support\v7\gridlayout`目录下

# 几个单位
- `dp(dip): device independent pixels(设备独立像素)`，不同设备有不同的显示效果，这个和设备硬件有关，一般我们为了支持WVGA、HVGA和QVGA推荐使用这个，不依赖像素
- `px: pixels(像素)`，不同设备显示效果相同，一般我们HVGA代表320x480像素，这个用的比较多
- `pt: point`，是一个标准的长度单位，1pt＝1/72英寸，用于印刷业，非常简单易用
- `sp: scaled pixels(放大像素)`，主要用于字体显示best for textsize

# 布局层次越少，性能越好

# 设置的drawable并不能自行设置大小，在XML是无法直接设置的，所以需要在Java代码中来进行修改
