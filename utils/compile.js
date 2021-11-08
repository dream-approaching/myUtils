// 简单的加密解密方法
export function compile(code) {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
}
export function uncompile(code) {
  code = unescape(code);
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

// 方法二  大致相同，多了一个 FixOffeset

/**
 * 功能：字符串(数字和字母)的简单加解密
 * @param {*} code 要加密的字符串
 */
const FixOffeset = 17;
export function compileParam(code = '') {
  let c = String.fromCharCode(code.charCodeAt(0) + FixOffeset + code.length);

  for (let i = 1; i < code.length; i += 1) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }

  return c; // 增加特殊字符编码，防止'/', '&', '='等字符造成的影响
}
export function unCompileParam(code = '') {
  // const code = unescape(originCode); // 增加特殊字符的解码
  let c = String.fromCharCode(code.charCodeAt(0) - FixOffeset - code.length);

  for (let i = 1; i < code.length; i += 1) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }

  return c;
}
