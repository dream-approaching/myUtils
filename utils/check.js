export function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

export function isUrl(path) {
  /* eslint no-useless-escape:0 */
  const reg1 = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg1.test(path);
}

export function isPhone(path) {
  const reg2 = /^1[34578]\d{9}$/;
  return reg2.test(path);
}

export function isEmail(path) {
  const reg3 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg3.test(path);
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
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    inWeixin = true;
  } else {
    inWeixin = false;
  }
  return inWeixin;
}

// 检测桌面端还是移动端
export const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

export const isAndroid =
  navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;

export const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export const isIosQQ = isIos && / QQ/i.test(navigator.userAgent);
export const isAndroidQQ =
  isAndroid &&
  /MQQBrowser/i.test(navigator.userAgent) &&
  /QQ/i.test(navigator.userAgent.split('MQQBrowser'));
