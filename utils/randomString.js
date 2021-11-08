/**
 * 生成随机的字母数字字符串
 */
export function generateRandomAlphaNum(len) {
  var rdmString = "";
  for (
    ;
    rdmString.length < len;
    rdmString += Math.random()
      .toString(36)
      .substr(2)
  );
  return rdmString.substr(0, len);
}
