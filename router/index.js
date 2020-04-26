// 路由模块
const defaultRouter = require('./default.js');
const user = require('./user.js');
const news = require('./news.js');

module.exports = {
  default: defaultRouter,
  user,
  news,
};