// 版本号比较
export const versionStringCompare = (currentVersion = "", lastVersion = "") => {
  const sources = currentVersion.split(".");
  const dests = lastVersion.split(".");
  const maxL = Math.max(sources.length, dests.length);
  let result = 0; // 初始默认两版本相同
  for (let i = 0; i < maxL; i++) {
    const preValue = sources.length > i ? sources[i] : 0;
    const currentNum = isNaN(Number(preValue)) ? preValue.charCodeAt() : Number(preValue);
    const lastValue = dests.length > i ? dests[i] : 0;
    const lastNum = isNaN(Number(lastValue)) ? lastValue.charCodeAt() : Number(lastValue);
    if (currentNum < lastNum) {
      // 当前版本 < 最新版本，需要更新
      result = -1;
      break;
    } else if (currentNum > lastNum) {
      // 当前版本 > 最新版本，无需更新
      result = 1;
      break;
    }
  }
  return result;
};

// 把字符串补0，转成相同位数的数字
export function versionToNum(versionStr) {
  const versionArr = versionStr.split(".");
  const num_place = ["", "0", "00", "000", "0000"];
  const r = num_place.reverse();
  for (let i = 0; i < versionArr.length; i++) {
    const len = versionArr[i].length;
    versionArr[i] = r[len] + versionArr[i];
  }
  const res = versionArr.join("");
  return +res;
}
