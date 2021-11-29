class ModuleCollection {
  constructor(raw) {
    this.register([], raw);
  }

  // 有种数组驱动的链式访问的味道, 起点确定，路径确定，一步一步的走到
  get(path) {
    return path.reduce((module, key) => {
      return module.getChild(key);
    }, this.root);
  }

  // path 是指模块的路径
  register(path, raw) {
    // 本身的state,getters,mutations,actions
    const newModule = new Module(raw);

    if (path.length === 0) {
      this.root = newModule;
    } else {
      const parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }

    // 遍历当前module携带的modules
    if (raw.module) {
      forEachValue(raw.module, (key, module) => {
        this.register(path.concat(key), module);
      });
    }
  }
}

class Module {
  constructor(rawState) {
    this._children = Object.create(null);
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  }

  addChild(key, module) {
    this._children[key] = module;
  }
  getChild(key) {
    return this._children[key];
  }
}

function forEachValue(obj, fn) {
  Object.keys(obj).forEach((item) => {
    fn(item, obj[item]);
  });
}

class Store {
  constructor(props) {
    this.state = {};
    this._modules = new ModuleCollection(props);
    this.dispatch = function bindDiapatch() {};
    this.commit = function bindCommit() {};

    installModule(this, this._modules.root.state, this._modules.root);
  }
}

function installModule(store, state, root) {
  
  store;

  console.log(root);
}

const store = new Store({
  state: {
    name: "yoyo",
  },
  getters: {
    preName: (state) => {
      return "1" + state.name;
    },
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
  },
  actions: {},
  module: {
    common: {
      state: {
        commoneName: "name",
        module: {
          state: {
            inner: "inner",
          },
        },
      },
      mutations: {
        setCommonName(state, name) {
          state.commoneName = name;
        },
      },
    },
  },
  strict: true,
  plugins: [],
});

store.commit("setName", "ranck");
store.dispatch("getName", 1);

console.log(store, 11);

// helper

/**
 * 语言基础：高阶函数，接受一个函数返回一个函数
 * 业务基础：通过类型判断和字符串特征判断，解决有没有namespace的问题和同时适配namespace字符串后面携带"/"问题
 * @param {*} fn
 * @returns
 */
const normalizeNamespace = (fn) => {
  return (namespace, mapper) => {
    if (typeof namespace !== "string") {
      mapper = namespace;
      namespace = "";
    } else {
      if (!namespace.endsWith("/")) {
        namespace += "/";
      }
    }
    return fn(namespace, mapper);
  };
};
/**
 *
 */
const mapState = normalizeNamespace((namespace, state) => {
  let result = {};

  normalizeMap(state).forEach(({ key, value }) => {
    if (namespace) {
      let state = this.$store.state;
      let getters = this.$store.getters;
      const module = getModuleByNamespace(this.$store, namespace);
      if (module) {
        state = module.context.state;
        getters = module.context.getters;
      }
    }
    result[key] =
      typeof value === "function"
        ? value.call(this, state, getters)
        : state[key];
  });
  return result;
});

const normalizeMap = (map) => {
  if (!isMap(map)) {
    return [];
  }
  return Array.isArray(map)
    ? map.map((item) => ({ item }))
    : Object.keys(map).map((item) => ({ item: map[item] }));
};

function isMap(map) {
  return Array.isArray[map] || isObject(map);
}

function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

// console.log(mapState(["haha"]));
// console.log(mapState({ haha: "haha1" }));
