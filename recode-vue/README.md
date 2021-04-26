# vue 源码理解

vue 初始化会创建 Vue 对象实例，在实例 mix，生命周期，编译 template（运行时），绑定时间，

## 数据驱动

### 初始化

new Vue() 主要调用 \_init()方法

- 合并参数
- 初始化生命周期
- 初始化事件绑定
- 初始化 Render 渲染
- 执行 beforeCreate 生命周期
- 初始化状态 state/props
- 执行 created 生命周期
- mount 挂载

### 挂载

mountComponent

- \_render
- \_update

### 模板编译过程

- Runtime + Compiler
- Runtime only

```javascript
const ast = parse(template.trim(), options);
optimize(ast, options);
const code = generate(ast, options);
```

```javascript
template => ast => render 函数 => vNode => UI
```

initRender 会调用 createElement， 生成 vNode

怎么生成的抽象语法树，语法树怎么样的？

抽象语法树中有没有存事件函数，怎么存的呢？

```javascript
ast = {
  'type': 1,
  'tag': 'ul',
  'attrsList': [],
  'attrsMap': {
    ':class': 'bindCls',
    'class': 'list',
    'v-if': 'isShow'
  },
  'if': 'isShow',
  'ifConditions': [{
    'exp': 'isShow',
    'block': // ul ast element
  }],
  'parent': undefined,
  'plain': false,
  'staticClass': 'list',
  'classBinding': 'bindCls',
  'static': false,
  'staticRoot': false,
  'children': [{
    'type': 1,
    'tag': 'li',
    'attrsList': [{
      'name': '@click',
      'value': 'clickItem(index)'
    }],
    'attrsMap': {
      '@click': 'clickItem(index)',
      'v-for': '(item,index) in data'
     },
    'parent': // ul ast element
    'plain': false,
    'events': {
      'click': {
        'value': 'clickItem(index)'
      }
    },
    'hasBindings': true,
    'for': 'data',
    'alias': 'item',
    'iterator1': 'index',
    'static': false,
    'staticRoot': false,
    'children': [
      'type': 2,
      'expression': '_s(item)+":"+_s(index)'
      'text': '{{item}}:{{index}}',
      'tokens': [
        {'@binding':'item'},
        ':',
        {'@binding':'index'}
      ],
      'static': false
    ]
  }]
}
```

代码优化主要标记静态节点 static，和静态节点的根 staticRoot ，因为不是所有的 template 都需要数据绑定，响应式处理。减少响应式处理的内容

##### generate

- genIf
- genFor
- genData
- genChildren

### 虚拟 dom 和真实 dom

DOM 对象，div 297 个属性，包含

- 文本属性
- 事件属性
- dom 节点查找操作属性
  - 位置偏移属性信息
  - dom 节点属性的操作属性
- 无障碍方面属性（38）
- 常量信息

虚拟 dom === vNode

核心属性

```javascript
var vNodeCore = {
  tag: "",
  data: {},
  children: [],
  text: "",
};

var vNodeOptimize = {
  key: "",
  isStatic: bool,
  isRootInsert: bool,
  isClone: bool,
};

// 服务端渲染 ssr属性

// 注释。异步函数，函数作用域
```

vNode 通过 createElement 创建

```
vNode => [create , diff, patch] => Dom
```

## 组件化

```
typeof tag === "string" // 创建标签，返回 vnode

createComponent // 创建组件 返回 vnode
```

- installComponentHooks // 安装组件 hooks
  componentVNodeHooks

patch

组件的本质是 JavaScript 描述对象

一个组件的 VNode 是如何创建、初始化、渲染的过程

- mergeOptions 合并参数配置
-

- 生命周期
  - beforeCreate created
  - beforeMount mounted
  - beforeUpdata updated
  - beforeDestroy destroyed

```
父子组件嵌套时候生命周期的调用顺序，
watch computed created mounted 等等顺序呢
```

- 组件注册

  - 全局注册 Vue.component("app", {})
    - initAssetRegisters
  - 局部注册
  - 安装方式

- 异步组件
  - webpack require
  - es6 import
  - 高级异步组件

## 响应式过程

### 需要解决的问题

- 修改那块 DOM
- 最小范围修改
- 数据和 DOM 绑定，只修改数据 dom 自动修改
-

### initState 顺序

```
initState = props => method => data => computed => watch
```

### 数据劫持

核心方法： Object.defineProperty
核心函数： defineReactive

由此观之

- props 属性会被处理成响应式，性能优化点，通过别的方式将数据传入组件
-

### observe 检测数据变化

Observer 对象，用于给对象添加 getter 和 setter，用于依赖收集和派发更新

- 实例化 Dep 对象
- def，定对象的属性，外增加描述
- 对对象和数组浅层处理

```
Observer => defineReactive  => observe
```

#### 依赖收集

谁使用了这个变量，都要把它存到数组里面，收集起来，一个变量 name，可能被多个地方使用

- dep.depend(); // 把当前对象放到 dep 实例的数组 subs 内
- Dep.target 静态属性 全局唯一的 Watcher
- Dep 是对 Watcher 的管理

#### Watcher

watcher 对象有哪些属性，这个对象是干嘛的，怎么工作的

数据驱动

#### nextTick

- js 单线程，事件循环
- flushCallbacks （刷新回调，执行回调数组中的回调）
- MessageChannel [port1, port2][onmessage postMessage]
- 一次性收集一批回调函数，在下次循环事件循环中执行，达到批量执行的目的，从而提高性能
- watcher的update 连续调用n次，

调用过程

```javascript
watcher.update => queueWatcher(this) => nextTick(flushSchedulerQueue) => [callbacks]timerFunc()
```


#### 调度过程

### diff 算法

- patchVnode 比对新旧两个节点

### vue 常用 api，元素，使用方面的实现

```javascript
const watch = {
  name: [
    sayName1,
    function (newVal, oldVal) {
      this.sayName2();
    },
    {
      handler: sayName3,
      immaediate: true,
    },
  ],
};
```
