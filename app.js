// 配置启动服务
const express = require('express');
const session = require('express-session');
const {getIPAddress} = require('./utils/index.js');

const app = express();

app.all('*', function(req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'Content-type');
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
  next();
});

// 配置模板引擎
app.set('views', './views');
app.set('view engine', 'ejs');

const config = require('./config.js');
const router = require('./router/index.js');

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: ("name", "value", {
    maxAge: 60 * 1000,
    secure: false
  })
}));

// req.connection.remoteAddress
// socket
// req.session

app.use('/user', router.user);
app.use('/news', router.news);
app.use('/', router.default);

app.listen(config.port, function () {
    console.log(`http://localhost:${config.port}`);
    console.log(`http://${getIPAddress()}:${config.port}`);
});