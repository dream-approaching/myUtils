/**
 * 传入一个obj，过滤出不需要的属性并返回
 * const obj = { name: "longzi", age: "24", sex: "mail" };
 * filterUsefulProp(obj, ["age"]) => {"name":"longzi","sex":"mail"}
 */
export function filterUsefulProp(obj, filterFields = []) {
  let newObj = {};
  let keys = Object.keys(obj);
  let newKeys = keys.filter(key => filterFields.indexOf(key) === -1);
  for (let key of newKeys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
// 功能同上
// omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }
export const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

// const obj = { name: "longzi", age: "24", sex: "mail" };
// getParamsString() => name=longzi&age=24&sex=mail
export function getParamsString(params) {
  let paramsString = '';
  const paramsArr = Object.keys(params);
  const lastOneIndex = paramsArr.length - 1;
  paramsArr.map((item, index) => {
    paramsString += `${item}=${params[item]}${index === lastOneIndex ? '' : '&'}`;
    return paramsString;
  });
  return paramsString;
}

/**
 * 冻结对象
 * 禁止修改属性和添加属性
 */
export const deepFreeze = obj =>
  Object.keys(obj).forEach(
    prop =>
      !(obj[prop] instanceof Object) || Object.isFrozen(obj[prop]) ? null : deepFreeze(obj[prop])
  ) || Object.freeze(obj);

/**
 * 找到object的某个key
 * const data = {
    level1: {
      level2: {
        level3: 'some data'
      }
    }
  };
  dig(data, 'level3'); // 'some data'
  dig(data, 'level4'); // undefined
 */
export const dig = (obj, target) =>
  target in obj
    ? obj[target]
    : Object.values(obj).reduce((acc, val) => {
        if (acc !== undefined) return acc;
        if (typeof val === 'object') return dig(val, target);
      }, undefined);

// size/length
// size([1, 2, 3, 4, 5]); // 5
// size('size'); // 4
// size({ one: 1, two: 2, three: 3 }); // 3
export const size = val =>
  Array.isArray(val)
    ? val.length
    : val && typeof val === 'object'
      ? val.size || val.length || Object.keys(val).length
      : typeof val === 'string' ? new Blob([val]).size : 0;
