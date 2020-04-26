// 路由模块
const express = require('express');
const router = express.Router();
const handler = require('../handler/news.js');

router.get('/addGet', handler.addGet);
router.post('/addPost', handler.addPost);

module.exports = router;