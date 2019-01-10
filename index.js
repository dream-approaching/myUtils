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

async function foo() {
  return 1234;
}

const foo2 = new Promise(function(resolve, reject) {
  resolve();
});

async function queryList() {
  return request(
    'https://shop.guizhen888.com/v1/goods/site',
    {
      body: {
        name: 'longzi',
        age: '15'
      }
    },
    10000
  );
}

export default class App extends React.Component {
  fetchAction = async () => {
    const result = await queryList();
    console.log(result);
  };

  componentDidMount() {
    const somePromise = new Promise((resolve, reject) => setTimeout(() => console.log(123), 5000)); //创建一个异步操作
    const cancelable = makeCancelable(somePromise); //为异步操作添加可取消的功能
    cancelable.cancel();
    cancelable.promise.then(() => console.log('resolved')).catch(({ isCanceled, ...error }) => {
      console.log(...error);
      console.log('isCanceled', isCanceled);
    });
    // 取消异步操作
    // console.log(cancelable);
    somePromise.catch(e => {
      console.log('somePromise');
      console.log(e);
    });
  }

  render() {
    const arr = [1, 3, 3, 4, 5, 1, 2, 3, 4, 8, 5, 6, 7, 2];
    const obj = { name: 'longzi', age: '24', sex: 'mail' };
    // console.log(moment().format("YYYY-MM-DD"));
    // console.log(
    //   moment()
    //     .add(70, "days")
    //     .format("YYYY-MM-DD")
    // );
    // console.log(
    //   moment()
    //     .subtract(10, "days")
    //     .format("YYYY-MM-DD")
    // );
    console.log(moment(1536667112000).fromNow());
    executionTime(this.fetchAction);
    return (
      <div className="App">
        <p>money转大写：{digitUppercase(1234.5678)}</p>
        <p>生成随机的字母数字字符串：{generateRandomAlphaNum(1234.5678)}</p>
        <p>数组去重：{removeDuplicateArr1(arr)}</p>
        <p>数组去重：{removeDuplicateArr2(arr)}</p>
        <p>isPromise：{(isPromise(foo()) && 'true') || 'false'}</p>
        <p>isPromise：{(isPromise(foo2) && 'true') || 'false'}</p>
        <p>isUrl：{(isUrl('http://www.baidu.com') && 'true') || 'false'}</p>
        <p>isPhone：{(isPhone(15250873625) && 'true') || 'false'}</p>
        <p>isInWeixin: {(isInWeixin() && 'true') || 'false'}</p>
        <button onClick={this.fetchAction}>请求</button>
        <p>过滤出不需要的属性:{JSON.stringify(filterUsefulProp(obj, ['age']))}</p>
        <p>{getParamsString(obj)}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
