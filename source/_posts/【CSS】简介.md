---
title: 【CSS】简介
date: 2019年04月08日 00:27:43
categories: CSS
typora-root-url: ..
typora-copy-images-to: ../images
---

# 是什么
---
CSS指层叠样式表 (Cascading Style Sheets)

# 目的
---
- 给html加各种各样的样式
- html结构和CSS样式分离
- 便于维护更新

# 组合
---
## CSS语法
选择器{属性名:属性值;属性名:属性值;}
说明：
	一个CSS样式包括选择器和格式声明语句
	选择器就是选择给哪个html标签加样式
	格式声明语句包括属性值:属性名
	格式声明语句要用{}
	属性名w3c已经定义好，直接使用
	属性值不用双引号
	属性值有单位通常是以px为单位，通常情况下必须带单位
		
## CSS引入
1. 行内样式：通过在标签中设置style属性来达到实现控制标签的样式的效果。（临时做测试用）
```css
<h1 style="color: red;">传智播客-前端与移动开发学院的CSS基础视频教程</h1>
```
2.内嵌样式表：在head标签中，嵌套一个style标签，在style标签中可以书写CSS的样式内容。（常用）
	<style type="text/CSS">
		p { 
			color: green; /*设置前景色，也就字体的颜色*/
			background-color: silver;
		}
	
		ul {
			background-color: red;
		}
	</style>
3. 外部样式表（常用）
	语法：<link rel="stylesheet" href="XX.CSS" />
4. 导入样式表：管理CSS样式
	语法：@import url(XX.CSS)
	注意：@import是CSS样式标签，所以必须放到CSS文件中，必须放到CSS样式表的最上端
		
CSS选择器
	基本选择器
		①标签选择器：选择给哪个标签加样式，自动指向该标签
			语法：标签选择器名{属性:属性值;}
			body{  }  p{  }  div{  }  table{  }  td{  }
			不用引用，把样式自动套到对应的标签，所有的对应标签都加上该样式
		②类选择器：给一类html标签加样式 
			语法：类选择器名{属性:属性值;} 
			选择器名是自己定义，要起得有意义 
			类用“.”来表示 ，例如：.myclass{ }  .page_header{ }  .login_content_input{ } 
			语法：<标签 class="选择器名"></标签>
			必须引用，每一个标签都有一个class属性
			注意：类选择可以引用多次 
		③id选择器：给特定的html标签加样式
			语法：id选择器名{属性:属性值;} 
			id用#来表示 
			选择器名自定义，要起得有意义 
			语法：<标签 id="选择器名"></标签>
			id必须得引用，引用的方法，每一个标签都要id属性。
			注意：id只能引用一次，表示唯一，通常id给javascript用，不是用来设置样式的，如果想设置样式，用类选择器。
		④通用选择器：（*所有）给所有的标签加样式
			语法：*{属性:属性值;} 
			html,body,p,table,ul,li,ol……给所有的html标签加样式 
			某一个不行设，那么就单设。 
			不是所有的浏览的浏览器都支持。Ie6版本不支持。 
		⑤复合选择器 
			多元素选择器：多个标签共有的属性和属性值，放到一起 
			语法：选择器，选择器，选择器……{共有的属性:属性值;} 
	
			后代元素选择器：给html的后代标签加样式 
			语法：选择器1 选择器2 选择器3{属性:属性值;} 
			选择器1里面的选择器2 
			子元素选择器：给html标签的子标签加样式
			格式：选择器＞选择器{属性:属性值;}
			某个标签里面的第一层

CSS文本属性
	伪类：锚＜a>（内容必须做好链接）
		a:link：未访问的链接
		a:visited：访问过的链接
		a:hover：鼠标移动链接上
		a:active：单击鼠标左键的那一时刻的样式
	文本属性： 
		.font-size 文本的大小 例如 font-size:12px;
		.font-weight 文本是否加粗 font-weight:bold//normal;
		.font-style 文本是否倾斜 font-style:italic; 倾斜 font-style:normal;正常
		.font-family 文字的字体 例如 font-family:隶书; 默认是宋体
		.text-decoration 文本是否有线条 text-decoration:underline; 下划线
		text-decoration:overline; 上划线 text-decoration:Iine-through; 删除线
		text-decoration:none; 当去掉所有的线条
		.text-indent 文本首行缩进例如 text-indent:2em;
		.color 文本的颜色 例如 color:red;
		letter-spacing 字母和字母之间的距离 例如 letter-spacing:2px;
		.word-spacing 单词和单词之间的距离 例如 word-spacing:2px;
		.text-aIign 文本的对齐方式 left center right 例如 text-align:center;
		
CSS背景属性
	background-color 背景颜色 例如 background-color:#ff0000;
	background-image 背景图片 例如 background-image:url(图片的路径)
	background-repeat背景图片是否平铺 no-repeat 不平铺 repeat-x 横向平铺 repeat-y 纵向平铺 repeat 横向纵向都平铺(默认)
	background-attachment 背景附件,背景是否随着上方的内容一起滚动
	取值 fixed 背景固定 scroll 滚动
	例如 background-attachment:fixed;
	background-position 背景图片的展开方式 例如 background-position:水平 垂直;
	英文 水平 left center right 垂直 top center bottom
	数值 正值 负值
	例如 background-position:left top;
	例如 background-position:0 0;(0对应left 0对应top)
	例如 background-position:10px 20px;(距离左边10px 距顶端20px)
	可以简写
	background:背景颜色 背景图片 背景图片是否平铺 (附件) 水平 垂直;
	注意 只有水平和垂直不能颠倒，其他的属性值可以颠倒

CSS列表
	去掉列表前面的项目符号 list-style-type:none; 可以简写为 list-style:none;
	用小图代替列表前面的符号 list-style-image:url(图片的地址)

CSS表格
	合并表格边框线 border-collapse:collapse;(table)
	边框线(html就可以加边框线)
	上边框
		1.border-top-color:颜色值; 上边框的颜色
		2.border-top-style:线型; 线型有 solid 实线 dashed 虚线 dotted 点状线
		3.border-top-width:粗细; 例如 border-top-width:2px;
		简写为 border-top:粗细 线型 颜色;
	清除原有格式
		*{
			margin:0;
			padding:0;
		}
	单行文字垂直居中 height=line-height;display:block;

CSS盒子模型
	内容区 width和height
	边框 border
	内边距 padding 内容和边框之间的距离
		padding-top 数值 内容和上边框之间的距离
		padding-right 数值 内容和右边框之间的距离
		padding-bottom 数值 内容和下边框之间的距离
		padding-left 数值 内容和左边框之间的距离
		简写形式
			padding:10px 20px 30px 40px; 上 10px 右 20px 下 30px 左 40px
			padding:10px 20px 30px; 上 10px 左右 20px 下30px
			padding:10px 30px; 上下 10px 左右 30px
			padding:10px; 上右下左都是10px
	外边距 margin 边框以外的距离
		margin-top 数值 上边框往外的距离
		margin-right 数值 右边框往外的距离
		margin-bottom 数值 下边框往外的距离
		margin-left 数值 左边框往外的距离
		简写形式
			margin:10px 20px 30px 40px; 上边框以外的10px 右是20px 下 30px  左40px
			margin:10px 20px 30px;上边框以外的10px 左右是20px 下是30px
			margin:10px 20px; 上下为10px 左右为20px
			margin:10px; 上下左右都是10px
		正常的文档流 从上往下解读代码 div之间的间距取最大值
		
	
CSS网站布局的思想
	网站的结构就是两部分（横向和纵向）如果是纵向的就是正常的文档流，设置内容器的宽度和高度，设置内容和边框之间的距离padding，边框往外的部分margin
	如果横向排列，我们就要使用浮动。
	float:left;
	float:right;
	里面有三个盒子 左  左  右  或者  左  左  左
	浮动的特点
		设置浮动的元素，不占空间
		设置浮动的元素层级高于普通元素
		设置浮动之后，无论之前是否是块元素，设置浮动之后一定是块元素
		如果在一行中的元素想横向排列，都设置浮动就可以
	通常情况下div里面还有div（外面的div父盒子），盒子里面还有盒子。
	如何让盒子在页面水平居中
		margin:xx auto;    margin-left:auto;margin-right:auto;
		
CSS清除格式
	清除所有的html标签的格式，后期如果使用，再重新设置
	*{margin:0;padding:0;}
	body,div,table,p,ul,li,h1,h2,h3,h4,h5,F6,dd,dl,dt,l,b,a{margin:0;padding:0;}

CSS布局流程
	1. 清楚格式
	2. 设置页面属性 body{font-size:14px;font-family:宋体;color:#000000;background-color:#e2e2e2;line-height:150%;}
	3. 把整个页面划分结构
	
CSS行内元素和块元素
	行内元素 输入充标签之后，不是自己占一行，行内元素的宽度和高度是由内容来决定，宽度和高度width height 不能用
		CSS样式是 display:inline;
		span b l u strong a
	块元素 输入充标签之后，自己独占一行，可以设置width和height
		CSS样式是 display:block;
		div p table ul li ol dl dt dd h1
	块转换为行内 display:inline;
	行内转化为块 display:block;
				
				
		

CSS溢出
	overflow 当内容溢出，如何显示
		hidden 隐藏
		auto 如果盒子装不下，就会出现滚动条 
		scroll 无论是否能装下都有滚动条边框

CSS继承
	外层元素的样式，会被里面的元素所继承
	文本的属性的可以继承 font-size font-family font-weight text-decoration:none/underline; color:red 
	注意 自己有的属性，不向外继承，不会继承父元素的属性

CSS优先级
	单个选择器的优先级
		标签选择器 < 类选择器 < id选择器 < 行内样式表
	复合选择器的优先级 计算权重，写的越精确，优先级越高
	标签选择器	1
	类选择器	10
	id选择器	100

CSS清除浮动
	clear:left;
	clear:right; 
	clear:both;
	<div>里面还有<div>(外面的div 父盒子)div父盒子没有设置固定高，里面设置了浮动，父元素受影响，无法正常的计算，如何让父元素得到一个自然高
	方法一 在父盒子里面的最下方加<div>，给该div设置清除浮动的属性 clear:both;
	方法二 浏览器的一个bug 一在父元素的样式中加overflow:hidden; 可以让父元素得到一个自然高

CSS盒子深入
	最外面蓝色的盒子内容区的宽度为1000px，width=1000
	红盒子 width=500,border=2px,padding=5px,margin=10px
	红盒子总的宽度=内容区的宽度+边框的宽度+padding+margin(左右)=534px
	黑盒子width=400,border=2,padding=10px,margin=10px
	400+2+2+10+10+10+10=444
	蓝盒子width>=红盒子+黑盒子
	注意：里面所有的值加到一起一定不能大于父盒了的内容区的宽度
	总的宽度=内容区的宽度width+border(左右)+padding(左右)+margin(左右)
	

CSS定位
	position
		坐标 偏离目标元素（窗口）多远的距离
		坐标的属性
		left	数值
		right	数值
		top	数值
		bottom	数值
	
		static 默认定位
		fixed 固定定位
			相对于浏览器窗口来进行定位
			如果不设置定位坐标，就在原来的位置
			层级要比普通标签高
			如果结合定位坐标，就是相对于目标位置的距离
			设置固定定位之后，一定是块元素
				固定在右下角的位置 
				
		relative 相对定位
			相对定位占空间
			如果不结合定位坐标，就是在原来的位置
			如果结合定位坐标，相对于自身，作为定位原点
			层级要高于普通的元素
		absolute 绝对定位
			设置绝对定位，不占空间
			设置层级高于普通的元素
			不结合定位坐标，就是在原来的位置
			绝对定位如果定位坐标，以祖先元素（设置绝对定位，相对定位）作为坐标的参考
			如果祖先没有设置定位，一直上找到body，就以body来进行定位，相对于整个窗口来定位

CSS3
	CSS2+新语法 对CSS2进行扩充 删减 优化
	选择器
		类选择器 id选择器 标签选择器
	属性选择器
		E——element 元素        data——属性
		<标签 属性="属性值"></标签>——html元素
		E[data]	选择带有data属性的元素对象，给该元素对象加样式
		E[data="one"]	选择带有data属性是元素对象,并且属性值等于one的加样式
		E[data^="o"]	选择带有data属性是元素对象,并且属性值以o开头的    ^开头
		E[data$="e"]	选择带有data属性是元素对象,并且属性值以e结尾的    $结尾
		E[data*="n"]	选择器带有data属性的元素对象,并且属性值包含n    *包含
		写在下面的代码的优先级高于上面的
	伪类结构
		E——element元素  
		
	伪元素
		
	设置文本的阴影
		text-shadow:水平 垂直 模糊强调 颜色;
		水平：   正值：右侧    负值：左侧  
		垂直：   正值：下         负值：上 
		可以有多组值，之间用逗号相隔。
	设置盒子的阴影
		box-shadow:水平 垂直 模糊强度 模糊尺寸 颜色 内外阴影inset；默认是外阴影但是如果是外阴影不加outset。
		如果有多组值中间用逗号相隔 
		水平：正值是右侧，负值是左侧。
		垂直：正值是下面，负值是上面。
	盒子变成圆角
		border-radius:左上  右上 右下  左下
		圆：50%
	设置半透明颜色
		color:rgba(255,0,0,0.3)
		background:rgba(0,0,0,0.6)
	背景图片的尺寸：
		background-size:宽度 高度; 例如 background-size: 400px 500px;
		background-size:cover; 背景图片会把整个盒子（宽度和高度）都用背景覆盖上
		background-size:contain; 背景图片会把盒子的宽度或高度覆盖就停止

