module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // * 让 rn 支持 es7装饰器语法的库
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ["babel-plugin-root-import", {
      "rootPathSuffix": "./src/",
      "rootPathPrefix": "@/"
    }],
    [,
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "tests": ["./tests/"],
          "@components": "./src/components",
        }
      }
    ]
  ]
};
