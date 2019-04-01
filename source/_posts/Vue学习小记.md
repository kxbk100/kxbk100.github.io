---
title: Vue学习小记
date: 2019-03-07 00:31:49
categories:
typora-root-url: ..
typora-copy-lalal-to: ../lalal
---

# Vue的安装及语法
> - 解析`{{XXX}}`
> - 页面中的数据与内存中的数据双向绑定
> - `v-mdodel`
> - `v-show`：暂时隐藏
> - `v-if`：直接从`dom`中删除

# v-for指令

# v-bind指令（v-bind:可简写为:）
> - 绑定数据和元素属性：src、href
```html
<style>
  .active {
    background: #a10;
  }
</style>
<a :class="{active: isActive}" :href="url">
  点我
</a>
```

```javascript
var app = new Vue({
  el: '#app',
  data: {
    url: 'http://baidu.com',
    img: 'https://dummyimage.com/100x100/ffcc00/ffffff',
    klass: 'btn btn-default',
    isActive: true,
  }
});
```

# v-on指令（v-on:可简写为@，v-on=不可简写）
> - v-on="{事件:函数, 事件:函数}"
> - v-on:事件="函数()"
> - 一定要都写在div#app中
> - 更多事件参考：https://cn.vuejs.org/v2/guide/events.html

# v-model指令及其修饰符
> - 适用于：`input、textarea、select`
> - `v-model`对变量进行绑定并操作，{{XXX}}输出变量
> - `v-model.lazy` 失焦更新
> - `v-model.trim` 删去空格
> - `v-model.number` 字符串转为number

# v-model在其他元素及类型上的用法

# 控制流指令
> - v-if
> - v-else-if
> - v-else

# 计算属性
> - 和`method`的区别：缓存数据，提高了性能
```javascript
computed: {
    sum: function () {
      return parseFloat(this.math) + parseFloat(this.physics) + parseFloat(this.english);
    },
    average: function () {
      return Math.round(this.sum / 3);
    }
  },
});
```

```html
<tr>
  <td>总分</td>
  <td>{{sum}}</td>
</tr>
<tr>
  <td>平均分</td>
  <td>{{average}}</td>
</tr>
```

# 组件 - 全局及局部组件
- 全局组件
```javascript
Vue.component('like', {
  template: ''
})
```

- 局部组件
```javascript
var alert_component = {
  template: '<button @click="on_click">弹弹弹</button>',
  methods: {
    on_click: function () {
      alert('Yo.');
    }
  }
};

new Vue({
  el: '#seg1',
  components: {
    alert: alert_component
  }
});
```

# 组件 - 配置组件
> - template必须放在el外面
```javascript
Vue.component('like', {
  template: '#like-component-tpl',
  data: function () {
    return {
      like_count: 10,
      liked: false,
    }
  },
  methods: {
    toggle_like: function () {
      if (!this.liked)
        this.like_count++;
      else
        this.like_count--;

      this.liked = !this.liked;
    }
  }
})
```

```html
<div id="app">
  <like></like>
</div>

<template id="like-component-tpl">
  <button :class="{liked: liked}" @click="toggle_like()">
    👍👍 {{like_count}}
  </button>
</template>
```

# 组件 - 父子通信
- 自定义传参
```javascript
Vue.component('user', {
  template: '<a :href="\'/user/\' + username">{{username}}</a>',
  props: ['username'],
  methods: {}
})
```

```html
<div id="app">
  <user username="biaoyansu"></user>
</div>
```

# 组件 - 子父通信
```javascript
Vue.component('balance', {
  template: `
  <div>
    <show @show-balance="show_balance"></show> //监听事件
    <div v-if="show">
    您的余额：￥98逸
    </div>
  </div>
  `,
  methods: {
    show_balance: function(data) {
      this.show = true;
      console.log('data:', data);
      
    }
  },
  data: function() {
    return {
      show: false,
    }
  }
});
Vue.component('show', {
  template: '<button @click="on_click()">显示余额</button>',
  methods: {
    on_click() {
      this.$emit('show-balance', {a: 1, b: 2}); //$emit向父级元素传递事件，触发一个事件
    }
  }
});

new Vue({
  el: '#app',
})
```

# 组件 - 任意及平行组件间通信
> - 模板必须有最外层根元素`div`等
```javascript
var Event = new Vue(); //调度器

Vue.component('huahua', {
  template: `
    <div>
        我说：<input @keyup="on_change" v-model="i_said"/>
    </div>`,
  methods: {
    on_change: function () {
      Event.$emit('huahua-said-something', this.i_said); //$emit触发器返回函数名和函数值
    }
  },
  data: function () {
    return {
      i_said: '',
    }
  }
})
Vue.component('shuandan', {
  template: `<div>花花说：{{huahua_said}}</div>`,
  data: function () {
    return {
      huahua_said: '',
    };
  },
  mounted: function () { //钩子，生命周期完成后，成熟后触发事件
    var me = this;
    Event.$on('huahua-said-something', function(data) {
      me.huahua_said = data;
    });
  }
})

new Vue({
  el: '#app',
})
```

# 过滤器
> - `filter`和计算属性类似，简单的用`filter`，复杂的用计算属性，计算属性有缓存
```javascript
Vue.filter('meter', function (val, unit) {
  val = val || 0; //无val默认值为0
  unit = unit || 'm'; //无unit默认值为m
  return (val / 1000).toFixed(2) + unit;
});

Vue.filter('currency', function (val, unit) {
  val = val || 0;
  unit = unit || '元';
  return val + unit;
});

new Vue({
  el: '#app',
  data: {
    price: 10,
    length: 10,
  }
})
```

```html
<div>
  <input v-model="length"> mm
  <br>
  {{length | meter}}
</div>
<hr>
<div>
  <input v-model="price">
  <br>
  {{ price | currency('USD') }}
</div>
```

# 自定义指令 - 基础配置
```javascript
Vue.directive('pin', function (el, binding) {

  var pinned = binding.value; //默认为false
  console.log(pinned)
  if (pinned) {
    el.style.position = 'fixed';
    el.style.top = '10px';
    el.style.left = '10px';
  } else {
    el.style.position = 'static';
  }
})

new Vue({
  el: '#app',
  data: {
    card1: {
      pinned: false,
    },
    card2: {
      pinned: false,
    },
  }
})
```

```html
<div v-pin="card1.pinned" class="card">
  <button @click="card1.pinned = !card1.pinned">钉住/取消</button>
  Lorem ipsum dolor sit amet, consectetur
</div>
<div v-pin="card2.pinned" class="card">
  <a @click="card2.pinned = !card2.pinned" href="#">pin it</a>
  Lorem ipsum dolor sit amet, consectetur
</div>
```

# 自定义指令 - 配置传参及修饰符
```javascript
Vue.directive('pin', function (el, binding) {

  var pinned = binding.value;
  //modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
  var position = binding.modifiers;
  var warning = binding.arg; //arg紧跟:

  if (pinned) {
    el.style.position = 'fixed';

    for (var key in position) {
      if (position[key]) {
        el.style[key] = '10px';
      }
    }
    if (warning === 'true') {
      el.style.background = 'yellow';
    }
  } else {
    el.style.position = 'static';
  }
})

new Vue({
  el: '#app',
  data: {
    card1: {
      pinned: false,
    },
    card2: {
      pinned: false,
    },
  }
})
```

```html
<div v-pin:true.bottom.left="card1.pinned" class="card">
  <button @click="card1.pinned = !card1.pinned">钉住/取消</button>
  Lorem ipsum dolor sit amet, consectetur
</div>
<div v-pin="card2.pinned" class="card">
  <a @click="card2.pinned = !card2.pinned" href="#">pin it</a>
  Lorem ipsum dolor sit amet, consectetur
</div>
```

###混合 `mixins`
> - `component`中代码复用
```javascript
var base = {
  methods: {
    show: function () {
      this.visible = true;
    },
    hide: function () {
      this.visible = false;
    },
    toggle: function () {
      this.visible = !this.visible;
    }
  },
  data: function () {
    return {
      visible: false,
    }
  }
};

Vue.component('tooltip', {
  template: `
  <div>
    <span @mouseenter="show" @mouseleave="hide">bys</span>
    <div v-if="visible">
    白岩松
    </div>
  </div>
  `,
  mixins: [base],
  data: function () {
    return {
      visible: true,
    }
  }
});

Vue.component('popup', {
  template: `
  <div>
    <button @click="toggle">Popup</button>
        <div v-if="visible">
        <span @click="hide">X</span>
          <h4>title</h4>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dolorum, iusto non nostrum porro ratione. Dolor dolorem id impedit. Dolore excepturi exercitationem incidunt iste magnam odio quas temporibus. Assumenda, magni.
        </div>
  </div>
  `,
  mixins: [base]
});

new Vue({
  el: '#app',
  data: {}
})
```
```html
<div id="app">
  <tooltip></tooltip>
  <popup></popup>
</div>
```

# 插槽 slots
> - 相当于`component`中的变量
```html
<div id="app">
  <panel>
    <div slot="title">
        Yo.
    </div>
    <div slot="content">
        Yo
        Yo
        Yo
    </div>
  </panel>
</div>

<template id="panel-tpl">
  <div class="panel">
    <div class="title">
        <slot name="title"></slot>
    </div>
    <div class="content">
        <slot name="content"></slot>
    </div>
    <div class="footer">
      <slot name="footer">
        更多信息
      </slot>
    </div>
  </div>
</template>
```

# vue-router是什么和怎么用
> 无整页刷新，表单数据点回来仍保留

# 安装和基本配置
```javascript
var routes = [
  {
    path: '/',
    component: {
      template: `
      <div>
        <h1>首页</h1>
      </div>
      `,
    },
  },
  {
    path: '/about',
    component: {
      template: `
      <div>
        <h1>关于我们</h1>
      </div>
      `,
    },
  },
];

var router = new VueRouter({
  routes: routes,
});

new Vue({
  el: '#app',
  router: router,
});
```

```html
<div id="app">
  <div>
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于我们</router-link>
  </div>
  <div>
    <router-view></router-view>
  </div>
</div>
  ```
  
# 传参及获取传参
```javascript
path: '/user/:name',
component: {
  template: `
  <div>
    <div>我叫：{{$route.params.name}}</div>
    <div>我今年：{{$route.query.age}}岁了</div>
  </div>
  `,
},
```

```html
<div id="app">
  <div>
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于我们</router-link>
    <router-link to="/user/王花花">王花花</router-link>
    <router-link to="/user/李拴蛋">李拴蛋</router-link>
  </div>
  <div>
    <router-view></router-view>
  </div>
</div>
```

# 子路由
```javascript
var routes = [
  {
    path: '/',
    component: {
      template: `
      <div>
        <h1>首页</h1>
      </div>
      `,
    },
  },
  {
    path: '/about',
    component: {
      template: `
      <div>
        <h1>关于我们</h1>
      </div>
      `,
    },
  },
  {
    path: '/user/:name',
    component: {
      template: `
      <div>
        <div>我叫：{{$route.params.name}}</div>
        <router-link to="more" append>更多信息</router-link>
        <router-view></router-view>
      </div>
      `,
    },
    children: [
      {
        path: 'more',
        component: {
          template: `
          <div>
          用户{{$route.params.name}}的详细信息
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cum deleniti doloribus expedita inventore natus officiis quod quos similique voluptate! Distinctio nisi sequi tenetur voluptatum? Debitis iste neque pariatur voluptatibus?
            </div>
          `
        }
      }
    ]
  },
];

var router = new VueRouter({
  routes: routes,
});
```

```html
<div id="app">
  <div>
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于我们</router-link>
    <router-link to="/user/王花花">王花花</router-link>
    <router-link to="/user/李拴蛋">李拴蛋</router-link>
  </div>
  <div>
    <router-view></router-view>
  </div>
</div>
```

# 手动访问和传参

# 命名视图
```javascript
var routes = [
  {
    path: '/',
    component: {
      template: `
      <div>
        <h1>首页</h1>
      </div>
      `,
    }
  },
  {
    path: '/user',
    components: {
      sidebar: {
        template: `
        <div>
          <ul>
              <li>用户列表</li>
              <li>权限管理</li>
          </ul>
        </div>
        `
      },
      content: {
        template: `
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti in, laborum molestias necessitatibus optio perferendis quaerat quas qui quisquam sapiente. Architecto corporis eos eum libero optio, perspiciatis quo rem vel!</div>
        `
      }
    }
  },
  {
    path: '/post',
    components: {
      sidebar: {
        template: `
        <div>
          <ul>
              <li>帖子列表</li>
              <li>标签管理</li>
          </ul>
        </div>
        `
      },
      content: {
        template: `
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti in, laborum molestias necessitatibus optio perferendis quaerat quas qui quisquam sapiente. Architecto corporis eos eum libero optio, perspiciatis quo rem vel!</div>
        `
      }
    }
  }
];
```

# 导航钩子
> 访问限制，中间件，组件的生命周期
```javascript
var routes = [
  {
    path: '/',
    component: {
      template: `<h1>首页</h1>`
    }
  },
  {
    path: '/login',
    component: {
      template: `<h1>登录</h1>`
    }
  },
  {
    path: '/post',
    component: {
      template: `<h1>帖子管理</h1>`
    }
  },
];

var router = new VueRouter({
  routes: routes,
});

router.beforeEach(function (to, from, next) {
  var logged_in = true;

  if (!logged_in && to.path == '/post')
    next('/login');
  else
    next();
});

router.afterEach(function (to, from) {

});
```
	
# 元数据及路由匹配
> 使用meta元数据进行访问限制
```javascript
var routes = [
  {
    path: '/',
    component: {
      template: `<h1>首页</h1>`
    }
  },
  {
    path: '/a',
    meta: {
      login_required: true,
    },
    component: {
      template: `<h1>A</h1>`
    }
  },
  {
    path: '/login',
    component: {
      template: `<h1>登录</h1>`
    }
  },
  {
    path: '/post',
    meta: {
      login_required: true
    },
    component: {
      template: `<div>
        <h1>帖子管理</h1>
        <router-link to="rain" append>后座</router-link>
        <router-view></router-view>
      </div>`,
    },
    children: [
      {
        path: 'rain',
        component: {
          template: `<h2>雨天asdf后座</h2>`
        }
      }
    ]
  },
];

var router = new VueRouter({
  routes: routes,
});

router.beforeEach(function (to, from, next) {
  var logged_in = true;

  if (!logged_in && to.matched.some(function (item) {
      return item.meta.login_required;
    }))
    next('/login');
  else
    next();
});
```
