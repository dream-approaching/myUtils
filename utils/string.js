/**
 * Capitalizes the first letter of a string.
 *  capitalize('fooBar'); // 'FooBar'
    capitalize('fooBar', true); // 'Foobar'
 */
export const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

/**
 * Capitalizes the first letter of every word in a string.
 * capitalizeEveryWord('hello world!'); // 'Hello World!'
 */
export const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

// Reverses a string.
export const reverseString = str => [...str].reverse().join('');

// 转成驼峰
export const toCamelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

// 金钱格式化
// toDecimalMark(12305030388.9087); // "12,305,030,388.909"
export const toDecimalMark = num => num.toLocaleString('en-US');

/**
 * 根据传入的数，加千分位与保留小数点后n位；
 * @param {*} value 要格式化的数据
 * @param {*} pointCount 保留小数点的位数
 */
export function toDecimalNumber(value = 0, pointCount = 2) {
  const withPoint = (+value).toFixed(pointCount);
  const reg = /(\d{1,3})(?=(\d{3})+(\.|$))/g;
  return withPoint.replace(reg, '$1,');
}

// 获取字节长度 区分汉字和英文
export function getByteLength(str = '') {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
}