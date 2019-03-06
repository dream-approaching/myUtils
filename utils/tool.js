// copy
export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

/**
 * 同步执行异步操作
 * chainAsync([
  next => {
    console.log("0 seconds");
    setTimeout(next, 1000);
  },
  next => {
    console.log("1 second");
    setTimeout(next, 1000);
  },
  () => {
    console.log("2 second");
  }
]);
 */
export const chainAsync = fns => {
  let curr = 0;
  const last = fns[fns.length - 1];
  const next = () => {
    const fn = fns[curr++];
    fn === last ? fn() : fn(next);
  };
  next();
};

// debounce 防抖
export const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// throttle 节流
export const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

/**
 * 计算函数执行的时间
 * window.performance
 * 还有一种是用console.time() && console.timeEnd
 */
export const executionTime = fn => {
  const before = window.performance.now();
  fn();
  const now = window.performance.now();
  console.log('函数执行了' + (now - before) + '毫秒.');
};

// 只执行一次的函数
export const once = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};

/**
 * 最大公约数
 * gcd(8, 36); // 4
 * gcd(...[12, 8, 32]); // 4
 */
export const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};

/**
 * 最小公倍数
 * lcm(12, 7); // 84
 * lcm(...[1, 3, 4, 5]); // 60
 */
export const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => x * y / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

// 指定范围内的随机数
export const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

// 求和 sum(1, 2, 3, 4);
export const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);

// null or undefined
export const isNil = val => val === undefined || val === null;

/**
 * 取url参数
 *  getURLParameters('http://url.com/page?name=Adam&surname=Smith'); // {name: 'Adam', surname: 'Smith'}
    getURLParameters('google.com'); // {}
 */
export const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );

// 深度对比两个对象是否相等
export const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a === null || a === undefined || b === null || b === undefined) return false;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};

/**
 * 深拷贝
 * Object.assign({}, obj);和...都是浅拷贝
 */
export const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
};

/**
 * 合并对象
 * 直接用assign合并的话，有相同的键会被覆盖
 * const object = {
    a: [{ x: 2 }, { y: 4 }],
    b: 1
  };
  const other = {
    a: { z: 3 },
    b: [2, 3],
    c: 'foo'
  };
  merge(object, other); // { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }
  Object.assign({}, object, other) // {a: { z: 3 },b: [2, 3],c: 'foo'}
 */
export const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
        return acc;
      }, {}),
    {}
  );
