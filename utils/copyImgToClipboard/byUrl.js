import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { digitUppercase } from '../utils/digitUpperCase';
import { generateRandomAlphaNum } from '../utils/randomString';
import { executionTime } from '../utils/tool';
import { removeDuplicateArr1, removeDuplicateArr2 } from '../utils/array';
import { isPromise, isUrl, isPhone, isInWeixin } from '../utils/check';
import { filterUsefulProp, getParamsString } from '../utils/object';
import { makeCancelable } from '../utils/cancelPromise';
import request from '../utils/request';

export default class extends React.Component {
  handleCopyImg = () => {
    this.copyImg('https://profile.csdnimg.cn/6/E/B/3_wangzhanzheng');
    // this.copyImg(this._imageRef.src);
  };

  createImage = options => {
    options = options || {};
    const img = document.createElement('img');
    if (options.src) {
      img.src = options.src;
    }
    return img;
  };

  copyToClipboard = async pngBlob => {
    try {
      await navigator.clipboard.write([
        // eslint-disable-next-line no-undef
        new ClipboardItem({
          [pngBlob.type]: pngBlob
        })
      ]);
      console.log('Image copied');
    } catch (error) {
      console.error(error);
    }
  };

  convertToPng = imgBlob => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imageEl = this.createImage({ src: window.URL.createObjectURL(imgBlob) });
    imageEl.onload = e => {
      canvas.width = e.target.width;
      canvas.height = e.target.height;
      ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height);
      canvas.toBlob(this.copyToClipboard, 'image/png', 1);
    };
  };

  copyImg = async src => {
    const img = await fetch(src);
    const imgBlob = await img.blob();
    const extension = src.split('.').pop();
    const supportedToBeConverted = ['jpeg', 'jpg', 'gif'];
    if (supportedToBeConverted.indexOf(extension.toLowerCase())) {
      return this.convertToPng(imgBlob);
    }
    if (extension.toLowerCase() === 'png') {
      return this.copyToClipboard(imgBlob);
    }
    console.error('Format unsupported');
  };

  render() {
    return (
      <div className='App'>
        <div onClick={this.handleCopyImg}>copy</div>
        <img
          ref={node => (this._imageRef = node)}
          id='image'
          width={50}
          height={80}
          src={myImages.interest}
          alt='logos'
        />
      </div>
    );
  }
}
