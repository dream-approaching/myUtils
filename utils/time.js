export function sleep(ms) {
  const start = new Date().getTime();
  console.log("休眠前：" + start);
  while (true) {
    if (new Date().getTime() - start > ms) {
      break;
    }
  }
  console.log("休眠后：" + new Date().getTime());
}

// await sleep(1000);
export const sleeps = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 时间戳转时间格式
 */
export function formatTimestamp(ms) {
  var date = new Date(ms);
  var month = date.getMonth();
  var day = date.getDate();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

  var dateStr = `${year}-${month}-${day}`;
  var time = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  return `${dateStr} ${time}`;
}
