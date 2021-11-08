// 删除指定索引的item, 返回一个新数组,不改变原数组
export function removeArrIndex(arr, index) {
  const arrBackups = arr;
  arr = arrBackups.slice(0, index);
  arr = arr.concat(arrBackups.slice(index + 1));
  return arr;
}

// 删除指定索引的item, 会改变原数组
export function removeArr2(arr, index, num) {
  arr.splice(index, num);
  return arr;
}

/**
 * 删除两个数组中重复的元素，返回一个新的数组
 * 这个方法不好，看下面的那个
 */
export function clearRepeatArr(arr, repeatArr, key) {
  const tempArr1 = [];
  const tempArr2 = [];
  let itemIsObject = false;

  if (!Array.isArray(arr)) return console.log('arr不是数组');
  if (!Array.isArray(repeatArr)) return console.log('repeatArr不是数组');

  // 将数repeatArr 中的元素值作为tempArr1 中的键，值为true；
  repeatArr.map((item, index) => {
    if (typeof item === 'object') {
      itemIsObject = true;
      if (!key) return console.log('请传入key值');
      return (tempArr1[repeatArr[index][key]] = true);
    } else {
      return (tempArr1[repeatArr[index]] = true);
    }
  });

  if (itemIsObject && !key) return [];
  // 过滤arr 中与repeatArr 相同的元素；
  arr.map((item, index) => {
    if (itemIsObject) {
      if (!tempArr1[arr[index][key]]) {
        return tempArr2.push(arr[index]);
      }
    } else if (!tempArr1[arr[index]]) {
      return tempArr2.push(arr[index]);
    }
    return null;
  });

  return tempArr2;
}

// 删除两个数组中重复的元素(找出两个数组不同的元素)
export function difference(arr, repeatArr) {
  const setRepeatArr = new Set(repeatArr);
  return arr.filter(item => !setRepeatArr.has(item));
}


/**
 * 复杂数组找不同(删除arr1元素中和arr2重复的元素)
 * var a = [{id: 1},{id: 2},{id: 3}]
 * var b = [{id: 3},{id: 4},{id: 5}]
 * differenceBy(a, b, x => x.id); // [{id: 1},{id: 2}]
 * differenceBy(b, a, x => x.id); // [{id: 4},{id: 5}]
 */
export function differenceBy(a, b, fn) {
  const s = new Set(b.map(fn));
  return a.filter(x => !s.has(fn(x)));
}

// 返回一个两个数组中重复元素的数组
export function intersection(a, b) {
  const s = new Set(b);
  return a.filter(x => s.has(x));
}

/**
 * 数组去重
 * Array.from可以把带有length属性类似数组的对象转换为数组
 * 也可以把字符串等可以遍历的对象转换为数组
 * 它接收2个参数，转换对象与回调函数
 * ...和Array.from都是ES6的方法
 */
export function removeDuplicateArr1(arr) {
  //利用set将[1,2,2,3,5,4,5]转化成set数据,利用array from将set转化成数组类型
  return Array.from(new Set(arr));
}

export function removeDuplicateArr2(arr) {
  //利用...扩展运算符将set中的值遍历出来重新定义一个数组,...是利用for...of遍历的
  return [...new Set(arr)];
}

/**
 * 单个复杂数组去重
 * var arr = [{id: 1},{id: 2},{id: 2},{id: 3},{id: 3},{id: 4}]
 * uniqueElementsBy(arr, (a,b) => a.id === b.id); // [{id: 1},{id: 2},{id: 3},{id: 4}]
 */
export const uniqueElementsBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);

/**
 * 两个数组合并去重
 * union([1, 2, 3], [4, 3, 2]); // [1,2,3,4]
 */
export function union(a, b) {
  return Array.from(new Set([...a, ...b]));
}

/**
 * 两个复杂数组合并去重
 * var a = [{id: 1},{id: 2},{id: 3}]
 * var b = [{id: 3},{id: 4},{id: 5}]
 * unionBy(a, b, x => x.id); // [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]
 */
export const unionBy = (a, b, fn) => {
  const s = new Set(a.map(fn));
  return Array.from(new Set([...a, ...b.filter(x => !s.has(fn(x)))]));
};


/**
 * 返回指定元素在数组中的index
 * indexOfAll([1, 2, 3, 1, 2, 3], 1) => [0,3]
 */
export function indexOfAll(arr, val) {
  return arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
}

/**
 * 最大的n个数(先排序再slice)
 * maxN([1, 2, 3]); // [3]
 * maxN([1, 2, 3], 2); // [3,2]
 */
export function maxN(arr, n = 1) {
  return [...arr].sort((a, b) => b - a).slice(0, n);
}

/**
 * 最小的n个数(先排序再slice)
 * maxN([1, 2, 3]); // [1]
 * maxN([1, 2, 3], 2); // [1,2]
 */
export function minN(arr, n = 1) {
  return [...arr].sort((a, b) => a - b).slice(0, n);
}

// 随机取出数组的某一个
export function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 根据给定的数组,转化成标准的label, value数组；如果给定的数组子集是字符串，那么value,label值都是该字符串
 * @param {array} arr 目标数组
 * @param {string} value value对应属性
 * @param {string} label label对应属性
 */
export const toFormatEnums = function toFormatEnums(arr = [], value, label) {
  return arr.map(item => {
    return typeof item === 'string'
      ? {
        label: item,
        value: item
      }
      : {
        label: item[label],
        value: item[value]
      };
  });
};

/**
 * 给定给一个数组arr2，找出其中一项满足item[key] = value, 若有多项则只返回第一项
 * @param {*} value 枚举值
 * @param {*} arr 枚举数组
 */
export const getEnumObject = (arr, key, value) => {
  const res = arr.filter(function (item) {
    return item[key] === value;
  });
  return res.length > 0 ? res[0] : {};
};
