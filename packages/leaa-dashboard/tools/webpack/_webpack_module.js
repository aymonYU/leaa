const fs = require('fs');
const lessToJS = require('less-vars-to-js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConst = require('./_webpack_const');

const globalExtractCSS = [/[\\/]node_modules[\\/].*antd/, /[\\/]src[\\/].*font_fi/];
const antdModifyVars = lessToJS(fs.readFileSync(`${webpackConst.SRC_DIR}/styles/variables.less`, 'utf8'));

// REQUIRE
const webpackModule = {
  strictExportPresence: false,
};

webpackModule.rules = [
  {
    test: webpackConst.REGX_TS,
    include: webpackConst.SRC_DIR,
    exclude: /node_modules/,
    rules: [
      {
        loader: 'babel-loader?cacheDirectory',
      },
    ],
  },
  //
  // FOR SRC STYLE
  {
    test: webpackConst.REGX_STYLE,
    exclude: /[\\/]node_modules[\\/].*antd/, // 除了antd 以外的样式都使用以下规则
    rules: [
      {
        loader: webpackConst.__DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
      },
      // 3rd Folder
      {
        exclude: webpackConst.SRC_DIR,
        loader: 'css-loader',
        options: {
          sourceMap: false,
        },
      },
      // src Folder
      {
        include: webpackConst.SRC_DIR,
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: webpackConst.LOADER_CSS_LOADERR_LOCAL_IDENT_NAME,
          },
          importLoaders: 1,
          sourceMap: false,
        },
      },
      // PostCSS
      {
        loader: 'postcss-loader',
      },
      // Less
      {
        test: /\.less$/,
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  },
  //
  // FOR GLOBAL STYLE
  {
    test: webpackConst.REGX_STYLE,
    include: globalExtractCSS,
    use: [
      {
        loader: webpackConst.__DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          modifyVars: antdModifyVars,
        },
      },
    ],
  },
  //
  // IMAGE
  {
    test: webpackConst.REGX_IMAGE,
    exclude: /src[\\/]assets[\\/]fonts/,
    use: [
      {
        loader: 'url-loader',
        options: {
          // limit: 8192,
          limit: 1024,
          name: `images/${webpackConst.STATIC_ASSET_NAME}`,
        },
      },
    ],
  },
  //
  // FONT
  {
    test: webpackConst.REGX_FONT,
    include: /src[\\/]assets[\\/]fonts/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'fonts/[folder]/[name].[ext]?[hash:8]',
        },
      },
    ],
  },
];

module.exports = webpackModule;
