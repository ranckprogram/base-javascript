# 数据结构与算法学习

## 算法分析

### 时间复杂度

- 最高次幂越小，效率越高
- 核心操作执行数量级
- 大O计数法
    - O(1) 常数级别
    - O(n) for循环
    - O(n^2) 平方阶 2次循环
    - O(n^3) 立方阶 3重循环
    - O(logn) 对数阶 （趋势，数据量变大后，会很大，底数忽略）二分策略
     - O(nlogn) 分治思想
    - 
```javascript
O(n^3) > O(n^2) >  O(nlogn) > O(n) > O(logn) > O(1)

```

### 空间复杂度

- 更少的内存来执行程序
- 更大程度考虑时间复杂度，空间复杂度可以加内存条搞定
- 


### 其他

- 减少执行次数（高斯公式）
- 变量循环代替递归
- 减少数据量
- 优化计算方式
- 最坏情况下的执行效率




> 问题，这几种不同时间复杂度的代码大概是什么样子呢？

```
function one () {
    console.log("hello world")
}

function logn () {}

function n (){
    for(var i = 0;i < 100; i ++) {
        console.log(i)
    }
}

function nlogn() {

}

function n2 () {}
function n3 () { }
```



## 排序算法

- 冒泡排序 Bubble sort O(n^2)
- 选择排序 Selection O(n^2) minIndex,相较冒泡交换减少

以上两种都只适合数据量少的场景


