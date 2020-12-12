const baseConfig = require('./webpack.config.base');

const devConfig = { ...baseConfig };
devConfig.devtool = 'inline-source-map';
module.exports = devConfig;
