/**
 * Capitalizes the first letter of a string.
 *  capitalize('fooBar'); // 'FooBar'
    capitalize('fooBar', true); // 'Foobar'
 */
export const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join("").toLowerCase() : rest.join(""));

/**
 * Capitalizes the first letter of every word in a string.
 * capitalizeEveryWord('hello world!'); // 'Hello World!'
 */
export const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

// Reverses a string.
export const reverseString = str => [...str].reverse().join("");

// 转成驼峰
export const toCamelCase = str => {
  let s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

// 金钱格式化
// toDecimalMark(12305030388.9087); // "12,305,030,388.909"
export const toDecimalMark = num => num.toLocaleString("en-US");
