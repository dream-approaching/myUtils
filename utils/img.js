
// 尾部加时间戳
export const withTimeStampUrl = (url) => {
  let currentTime_stamp = new Date().getTime();
  url = `${url}${url.indexOf('?') > -1 ? '&' : '?'}timestamp=${currentTime_stamp}`;
  return url;
};

// 将base64转换为文件
export const base64toFile = (base64, filename) => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n); // eslint-disable-line
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], filename, { type: mime });
  return file;
};

/**
 * 将image转成base64编码
 * 思路：canvas.toDataURL("image/png")
 *
 * img.setAttribute('crossOrigin', 'anonymous') 用于解决canvas跨域问题
 * https://www.jianshu.com/p/6fe06667b748
 * 此属性不能完全解决跨域问题，还需要图片服务器设置跨域头
 * https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
 * https://segmentfault.com/a/1190000012550346?utm_source=tag-newest
 */
export const getBase64ByImageDom = (imgDom) => {
  const canvas = document.createElement('canvas');
  canvas.width = imgDom.width;
  canvas.height = imgDom.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgDom, 0, 0, imgDom.width, imgDom.height);

  const dataURL = canvas.toDataURL('image/png');
  return dataURL;
  // return dataURL.replace("data:image/png;base64,", "");
};

//  图片转化本地base64
export const getBase64ByImageUrl = (imgUrl) => {
  const imgExp = new RegExp(`^((https|http)?://)`);
  console.log('%c  是否为线上图片:', 'color: #0e93e0;background: #aaefe5;', imgExp.test(imgUrl));
  // 非线上图片
  if (!imgExp.test(imgUrl)) {
    return imgUrl;
  }
  // 线上图片--转化成本地base64
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); // 图片跨域时有用，必须前面
    img.src = withTimeStampUrl(imgUrl); // 加时间戳避免缓存导致的跨域问题
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg'));
    };
  });
};

// Base64字符串转二进制
function base64toBlob(base64) {
  var arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}

function main(favicon) {
  const img = document.createElement('img');
  img.src = favicon;
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function () {
    const data = getBase64Image(img);
    console.log(data);
  };
}

//  canvas.toBlob
export const urlToBlob = (imgUrl) => {
  const imgExp = new RegExp(`^((https|http)?://)`);
  console.log('%c  是否为线上图片:', 'color: #0e93e0;background: #aaefe5;', imgExp.test(imgUrl));
  // 非线上图片
  if (!imgExp.test(imgUrl)) {
    return imgUrl;
  }
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); // 图片跨域时有用，必须前面
    img.src = withTimeStampUrl(imgUrl); // 加时间戳避免缓存问题

    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      return canvas.toBlob((a) => resolve(a), 'image/jpeg');
    };
    img.onerror = function (err) {
      reject(err);
    };
  });
};

export const downloadBlobImg = (blob) => {
  const newA = document.createElement('a');
  newA.download = new Date().getTime();
  newA.href = URL.createObjectURL(blob);
  newA.click();
  window.URL.revokeObjectURL(newA.href); // 释放掉blob对象
};
