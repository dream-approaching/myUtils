export function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}
/* eslint no-useless-escape:0 */
const reg1 = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg1.test(path);
}

const reg2 = /^1[34578]\d{9}$/;

export function isPhone(path) {
  return reg2.test(path);
}

/**
 * 是否是十六进制
 */
export function isHex(str) {
  return Boolean(str.match(/^(0x)?[0-9a-fA-F]+$/));
}

/**
 * 是否在微信浏览器内
 */
export function isInWeixin() {
  let inWeixin = false;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    inWeixin = true;
  } else {
    inWeixin = false;
  }
  return inWeixin;
}
