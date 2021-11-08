export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function sleep(ms) {
  const start = new Date().getTime();
  console.log('休眠前：' + start);
  while (true) {
    if (new Date().getTime() - start > ms) {
      break;
    }
  }
  console.log('休眠后：' + new Date().getTime());
}

// await sleep(1000);
export const sleeps = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 时间戳转时间格式
 */
export function formatTimestamp(ms) {
  var date = new Date(ms);
  var month = '0' + date.getMonth();
  var day = '0' + date.getDate();
  var year = date.getFullYear();
  var hours = '0' + date.getHours();
  var minutes = '0' + date.getMinutes();
  var seconds = '0' + date.getSeconds();

  var dateStr = `${year}-${month.substr(-2)}-${day.substr(-2)}`;
  var time = `${hours.substr(-2)}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  return `${dateStr} ${time}`;
}

export const changeSeconds = time => {
  const day = Math.floor(time / 86400);
  const hour = Math.floor(Math.floor(time % 86400) / 3600);
  const min = Math.floor(Math.floor(time % 3600) / 60);
  const second = time % 60;
  return `${fixedZero(day)}天${fixedZero(hour)}时${fixedZero(min)}分${fixedZero(second)}秒`;
};
