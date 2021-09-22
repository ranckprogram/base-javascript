const Node = require("./Node");

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

// 左侧比父节点小，右侧比父节点大

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  insert(key) {
    if (this.root === null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
  search(key) {
    return this.searchNode(this.root, key);
  }
  // 中序遍历， 搜索二叉树的遍历顺序相当于升序
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  // 先序遍历，先访问父节点后访问子节点，打印结构化文档
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  // 后序遍历，先访问子节点在访问本身，计算一个目录以及目录总体大小
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  min() {
    return this.minNode(this.root);
  }
  max() {
    return this.maxNode(this.root);
  }
  remove(key) {
    this.removeNode(this.root, key);
  }

  /**
   * 私有方法
   * */
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node);
    }
  }

  minNode(node) {
    let current = node;
    if (current !== null) {
      while (current.left !== null) {
        current = current.left;
      }
    }

    return current;
  }

  maxNode(node) {
    let current = node;
    while (current !== null && current.right !== null) {
      current = current.right;
    }
    return current;
  }

  searchNode(node, key) {
    if (node === null) {
      return false;
    } else {
      if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
        return this.searchNode(node.right, key);
      } else if (this.compareFn(node.key, key) === Compare.BIGGER_THAN) {
        return this.searchNode(node.left, key);
      } else {
        return true;
      }
    }
  }

  removeNode(key) {
    
  }
}

const bs = new BinarySearchTree();
bs.insert(5);
bs.insert(3);
bs.insert(2);
bs.insert(20);
bs.insert(19);
bs.insert(6);

console.log(bs);

bs.inOrderTraverse(function (node) {
  console.log(node.key);
});
console.log("preOrderTraverse");
bs.preOrderTraverse(function (node) {
  console.log(node.key);
});

console.log("postOrderTraverseNode");
bs.postOrderTraverse(function (node) {
  console.log(node.key);
});

console.log("min", bs.min());

console.log("max", bs.max());

console.log("search", bs.search(6));
