# vue 源码理解

vue 初始化会创建 Vue 对象实例，在实例 mix，生命周期，编译 template（运行时），绑定时间，

### 初始化

new Vue() 主要调用 _init()方法

- 合并参数
- 初始化生命周期
- 初始化事件绑定
- 初始化Render渲染
- 执行beforeCreate生命周期
- 初始化状态 state/props
- 执行created生命周期
- mount挂载


### 挂载

- render
- update


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




怎么生成的抽象语法树，语法树怎么样的？

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

代码优化主要标记静态节点static，和静态节点的根staticRoot ，因为不是所有的template都需要数据绑定，响应式处理。减少响应式处理的内容


##### generate
- genIf
- genFor
- genData
- genChildren

### 组件化

### 响应式过程

数据驱动

### 调度过程

### diff 算法
