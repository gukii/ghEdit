
Got Antd-Mobile installed, following Ant Design's own guide to setup Create React App (CRA) with Antd:
- English: https://mobile.ant.design/docs/react/use-with-create-react-app
- 中文：https://mobile.ant.design/docs/react/use-with-create-react-app-cn

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Removed the remaining import of the CSS library, this is handled by babel-plugin-import now.
```js
/* @import '~antd-mobile/dist/antd.css'; */
```


## For desktop developers:

### Use Antd instead of Antd-Mobile
there s a repo for that:
https://github.com/gukii/AntdCreateReactApp.git

### or make changes to this repo:

If u develop for mobile u might want to replace the antd library with antd-mobile:
- yarn remove antd-mobile
- yarn add antd
- Edit 'config-overrides.js' and change libaryName: 'antd' to 'antd-mobile':
```js
       config = injectBabelPlugin(['import', { libraryName: 'ant', style: true }], config);  // change importing css to less
 
```
- When importing react components, make sure you ll import from 'antd', instead of 'antd-mobile.


## Install and run:

```bash
$ npm install
$ npm start
```

or:

```bash
$ yarn
$ yarn start
```


App.js imports a button component from 'antd-mobile' and renders it on screen.

.config-overrides.js allows switching between CSS and LESS.
The LESS version shows how to override the color of the Button.

CSS/LESS and React components get imported selectively, only the ones used will become part of the final bundle.


## Libraries from package.json:

- [antd](https://github.com/ant-design/ant-design-mobile)
- [babel-plugin-import](http://github.com/ant-design/babel-plugin-import/)
- [create-react-app](https://github.com/facebookincubator/create-react-app)
- [react-app-rewired](https://github.com/timarney/react-app-rewired)
- [less-loader](https://github.com/webpack/less-loader)



