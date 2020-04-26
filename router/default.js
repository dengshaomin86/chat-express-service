// 路由模块
const express = require('express');
const router = express.Router();
const config = require('./../config');
const handler = require("../handler/views.js");

router.get('/', handler.index);
router.get('/favicon.ico', handler.favicon);
router.get('/index', handler.index);
router.get('/detail', handler.detail);
router.get('/add', handler.add);

// 处理静态资源
router.use('/static', express.static(config.staticPath));

// 处理 404 错误请求
router.get('*', function (req, res) {
  res.status(404).send('404 Not Found');
});

module.exports = router;