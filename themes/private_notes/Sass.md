# 文件后缀名

```scss
//文件后缀名为sass的语法
body
	background: #eee
	font-size:12px
p
	background: #0982c1
 
//文件后缀名为scss的语法
body {
  background: #eee;
  font-size:12px;
}

p {
  background: #0982c1;
} 
```

# 导入

## css文件：@import 'reset.css'

跟普通CSS导入样式文件一样，导入的css文件不会合并到编译后的文件中，而是以@import方式存在

## sass文件：@import 'reset'

被导入sass文件a.scss

```scss
//a.scss
body {
  background: #eee;
}
```

需要导入样式的sass文件b.scss

```scss
@import "reset.css";
@import "a";
p{
  background: #0982c1;
} 
```

转译出来的b.css样式

```scss
@import "reset.css";
body {
  background: #eee;
}

p{
  background: #0982c1;
}
```


# 变量

- sass的变量必须是$开头，后面紧跟变量名
- 变量值和变量名之间就需要使用冒号(:)分隔开
- 值后面加上!default则表示默认值

## 普通变量：定义之后可以在全局范围内使用

```scss
//sass style
$fontSize: 12px;
body {
  font-size: $fontSize;
}

//css style
body {
  font-size: 12px;
}
```

## 默认变量

- sass的默认变量仅需要在值后面加上 !default

```scss
//sass style
$baseLineHeight: 1.5 !default;
body {
  line-height: $baseLineHeight;
}
//css style
body {
  line-height: 1.5;
}
```

- sass的默认变量一般是用来设置默认值，然后根据需求来覆盖的，只需要在默认变量**之前**重新声明下变量即可

```SCSS
//sass style
$baseLineHeight: 2;
$baseLineHeight: 1.5 !default;
body {
  line-height: $baseLineHeight;
}
//css style
body {
  line-height: 2;
}
```

## 特殊变量

一般我们定义的变量都为属性值，可直接使用，但是如果变量作为属性或在某些特殊情况下，如运算、拼接等则必须要以 #{$variables}形式使用

```SCSS
//sass style
$borderDirection: top !default;
$baseFontSize: 12px !default;
$baseLineHeight: 1.5 !default;
//应用于class和属性
.border-#{$borderDirection} {
  border-#{$borderDirection}: 1px solid #ccc;
}
//应用于复杂的属性值
body {
  font: #{$baseFontSize}/#{$baseLineHeight};
}
//css style
.border-top {
  border-top: 1px solid #ccc;
}
body {
  font: 12px/1.5;
}
```

## 全局变量

在选择器中声明的变量会覆盖外面全局声明的变量

# 嵌套

## 选择器嵌套

可以使用 &表示父元素选择器

```scss
//sass style
#top_nav {
  line-height: 40px;
  text-transform: capitalize;
  background-color: #333;
  li {
    float: left;
  }
  a {
    display: block;
    padding: 0 10px;
    color: #fff;
    &:hover {
      color: #ddd;
    }
  }
}

//css style
#top_nav {
  line-height: 40px;
  text-transform: capitalize;
  background-color: #333;
}
#top_nav li {
  float: left;
}
#top_nav a {
  display: block;
  padding: 0 10px;
  color: #fff;
}
#top_nav a:hover {
  color: #ddd;
}

```

---



# 混合

sass中使用 @mixin声明混合，可以传递参数，参数名以$符号开始，多个参数以逗号分开，也可以给参数设置默认值。声明的 @mixin通过 @include来调用。

## (1) 无参数mixin

//sass style
 //-------------------------------
 @mixin center-block {
     margin-left:auto;
     margin-right:auto;
 }
 .demo{
     @include center-block;
 }

//css style
 //-------------------------------
 .demo{
     margin-left:auto;
     margin-right:auto;
 }

## (2) 有参数mixin

## (3) 多个参数mixin

## (4) 多组值参数mixin

## (5) @content

# 7 继承

## (1) 继承 @extend

//sass style
 //-------------------------------
 h1{
   border: 4px solid #ff9aa9;
 }
 .speaker{
   @extend h1;
   border-width: 2px;
 }

//css style
 //-------------------------------
 h1,.speaker{
   border: 4px solid #ff9aa9;
 }
 .speaker{
   border-width: 2px;
 }

## (2) 占位选择器 %

定义了两个占位选择器 %ir和 %clearfix，其中 %clearfix这个没有调用，所以解析出来的css样式也就没有clearfix部分。占位选择器的出现，使css文件更加简练可控，没有多余。所以可以用其定义一些基础的样式文件，然后根据需要调用产生相应的css

//sass style
 //-------------------------------
 %ir{
   color: transparent;
   text-shadow: none;
   background-color: transparent;
   border: 0;
 }
 %clearfix{
   @if $lte7 {
     *zoom: 1;
   }
   &:before,
   &:after {
     content: "";
     display: table;
     font: 0/0 a;
   }
   &:after {
     clear: both;
   }
 }
 \#header{
   h1{
     @extend %ir;
     width:300px;
   }
 }
 .ir{
   @extend %ir;
 }

//css style
 //-------------------------------
 \#header h1,
 .ir{
   color: transparent;
   text-shadow: none;
   background-color: transparent;
   border: 0;
 }
 \#header h1{
   width:300px;
 }

# 8 函数

实际项目中我们使用最多的应该是颜色函数，而颜色函数中又以lighten减淡和darken加深为最，其调用方法为 lighten($color,$amount)和darken($color,$amount)，它们的第一个参数都是颜色值，第二个参数都是百分比

//sass style
 //-------------------------------                     
 $baseFontSize:      10px !default;
 $gray:              #ccc !defualt;        

// pixels to rems 
 @function pxToRem($px) {
   @return $px / $baseFontSize * 1rem;
 }

body{
   font-size:$baseFontSize;
   color:lighten($gray,10%);
 }
 .test{
   font-size:pxToRem(16px);
   color:darken($gray,10%);
 }

//css style
 //-------------------------------
 body{
   font-size:10px;
   color:#E6E6E6;
 }
 .test{
   font-size:1.6rem;
   color:#B3B3B3;
 }

# 9 运算

sass具有运算的特性，可以对数值型的Value(如：数字、颜色、变量等)进行加减乘除四则运算。请注意运算符前后请留一个空格，不然会出错

$baseFontSize:          14px !default;
 $baseLineHeight:        1.5 !default;
 $baseGap:               $baseFontSize * $baseLineHeight !default;
 $halfBaseGap:           $baseGap / 2  !default;
 $samllFontSize:         $baseFontSize - 2px  !default;

//grid 
 $_columns:                     12 !default;      // Total number of columns
 $_column-width:                60px !default;   // Width of a single column
 $_gutter:                      20px !default;     // Width of the gutter
 $_gridsystem-width:            $_columns * ($_column-width + $_gutter); //grid system width

# 10 条件判断及循环

## (1) @if判断

@if可一个条件单独使用，也可以和 @else结合多条件使用

//sass style
 //-------------------------------
 $lte7: true;
 $type: monster;
 .ib{
     display:inline-block;
     @if $lte7 {
         *display:inline;
         *zoom:1;
     }
 }
 p {
   @if $type == ocean {
     color: blue;
   } @else if $type == matador {
     color: red;
   } @else if $type == monster {
     color: green;
   } @else {
     color: black;
   }
 }

//css style
 //-------------------------------
 .ib{
     display:inline-block;
     *display:inline;
     *zoom:1;
 }
 p {
   color: green; 
 }

## (2) 三目判断

语法为： if($condition, $if_true, $if_false) 。三个参数分别表示：条件，条件为真的值，条件为假的值

if(true, 1px, 2px) => 1px
 if(false, 1px, 2px) => 2px

## (3) for循环

for循环有两种形式，分别为： @for $var from <start> through <end>和 @for $var from <start> to <end>。$i表示变量，start表示起始值，end表示结束值，这两个的区别是关键字through表示包括end这个数，而to则不包括end这个数。

//sass style
 //-------------------------------
 @for $i from 1 through 3 {
   .item-#{$i} { width: 2em * $i; }
 }

//css style
 //-------------------------------
 .item-1 {
   width: 2em; 
 }
 .item-2 {
   width: 4em; 
 }
 .item-3 {
   width: 6em; 
 }

## (4) @each循环

语法为： @each $var in <list or map>。其中 $var表示变量，而list和map表示list类型数据和map类型数据。sass 3.3.0新加入了多字段循环和map数据循环。

- 单个字段list数据循环

//sass style
 //-------------------------------
 $animal-list: puma, sea-slug, egret, salamander;
 @each $animal in $animal-list {
   .#{$animal}-icon {
     background-image: url('/images/#{$animal}.png');
   }
 }

//css style
 //-------------------------------
 .puma-icon {
   background-image: url('/images/puma.png'); 
 }
 .sea-slug-icon {
   background-image: url('/images/sea-slug.png'); 
 }
 .egret-icon {
   background-image: url('/images/egret.png'); 
 }
 .salamander-icon {
   background-image: url('/images/salamander.png'); 
 }

- 多个字段list数据循环

//sass style
 //-------------------------------
 $animal-data: (puma, black, default),(sea-slug, blue, pointer),(egret, white, move);
 @each $animal, $color, $cursor in $animal-data {
   .#{$animal}-icon {
     background-image: url('/images/#{$animal}.png');
     border: 2px solid $color;
     cursor: $cursor;
   }
 }

//css style
 //-------------------------------
 .puma-icon {
   background-image: url('/images/puma.png');
   border: 2px solid black;
   cursor: default; 
 }
 .sea-slug-icon {
   background-image: url('/images/sea-slug.png');
   border: 2px solid blue;
   cursor: pointer; 
 }
 .egret-icon {
   background-image: url('/images/egret.png');
   border: 2px solid white;
   cursor: move; 
 }

- 多个字段map数据循环

//sass style
 //-------------------------------
 $headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
 @each $header, $size in $headings {
   \#{$header} {
     font-size: $size;
   }
 }

//css style
 //-------------------------------
 h1 {
   font-size: 2em; 
 }
 h2 {
   font-size: 1.5em; 
 }
 h3 {
   font-size: 1.2em; 
 }