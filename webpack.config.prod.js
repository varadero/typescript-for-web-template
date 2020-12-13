const baseConfig = require('./webpack.config.base');

const prodConfig = { ...baseConfig };
prodConfig.devtool = 'source-map';
prodConfig.optimization.minimize = true;
module.exports = prodConfig;
