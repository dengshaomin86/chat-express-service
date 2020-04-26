// 路由模块
const express = require('express');
const router = express.Router();
const handler = require('../handler/user.js');

router.post('/signIn', handler.signIn);
router.post('/signUp', handler.signUp);

module.exports = router;