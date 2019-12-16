// 将base64转换为文件
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
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
export const getBase64Image = imgDom => {
  const canvas = document.createElement('canvas');
  canvas.width = imgDom.width;
  canvas.height = imgDom.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgDom, 0, 0, imgDom.width, imgDom.height);

  const dataURL = canvas.toDataURL('image/png');
  return dataURL;
  // return dataURL.replace("data:image/png;base64,", "");
};
function main() {
  const img = document.createElement('img');
  img.src = favicon;
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function() {
    const data = getBase64Image(img);
    console.log(data);
  };
}
