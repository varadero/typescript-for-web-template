const baseConfig = require('./webpack.config.base');

const prodConfig = { ...baseConfig };
prodConfig.devtool = 'source-map';
module.exports = prodConfig;
