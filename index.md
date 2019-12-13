## 目录结构
index.md  
部分目录结构如下：

```
├── config
├── src
│   ├── components
│   ├── index.js
│   ├── layouts
│   ├── logo.svg
│   ├── pages
│   │   └── home
│   │       ├── components
│   │       │   └── commentList
│   │       │       ├── index.js
│   │       │       └── style.css
│   │       └── index.js
│   ├── redux
│   │   ├── reducers.js
│   │   ├── rootSaga.js
│   │   ├── store.js
│   │   ├── todos
│   │   │   ├── actions.js
│   │   │   ├── reducers.js
│   │   │   └── sagas.js
│   │   └── youtubeSearch
│   │       ├── actions.js
│   │       ├── reducers.js
│   │       └── sagas.js
│   ├── router.js
│   └── utils
```

- config 是 webpack 配置文件
- src/components 放公共组建。
- src/layouts 负责整个 app 的布局结构，可能存在子级路由。
- src/pages 是页面。
- src/redux react-redux。
- src/utils 公共函数。
- src/index.js 是入口文件
- src/router.js 是顶级路由。

> #### 约定
>
> 1.  一开始的 components 都放在 pages 下面，如果有其他页面需要用到这个组件时，再抽出来放到 src/components/下面。（为了防止需求变化，如果要删除该 page，还要到 components 里面去找到这个组件，删除的时候还不确定有没有其他页面引用。）
> 2.  src/redux 下面的文件夹都写各自的 reducer、actions、saga 等

##### errorBoundary

- 然后可以写一个高阶组件，把每个文件都用 ErrorBoundary 包起来
- 如果是继承型(class extends WrapComponent)的高阶组件，则还需要在最外层包一个 ErrorBoundary
- 如果是代理型(class extends React.Component)的高阶组件，租不需要在最外层包 ErrorBoundary
- 子 ErrorBoundary 触发了就不会再触发父级的 ErrorBoundary 了
