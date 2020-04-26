const {getPostBody} = require("../utils/index.js");
const {db_user} = require("../utils/db.js");

module.exports = {
  signIn(req, res) {
    getPostBody(req, function (postBody) {
      db_user.findUser(postBody.username).then(data => {
        if (data.password !== postBody.password) {
          res.send({
            message: "密码错误",
            flag: false
          });
          return;
        }
        res.send({
          message: "登录成功",
          flag: true
        });
      }).catch(err => {
        res.send({
          message: "用户不存在",
          flag: false
        });
      });
    });
  },
  signUp(req, res) {
    getPostBody(req, function (postBody) {
      db_user.findUser(postBody.username).then(data => {
        res.send({
          message: "用户已存在",
          flag: false
        });
      }).catch(err => {
        if (postBody.password !== postBody.cfPassword) {
          res.send({
            message: "密码不一致，请重新输入",
            flag: false
          });
          return;
        }
        db_user.add(postBody).then(data => {
          res.send({
            message: "注册成功",
            flag: true
          });
        }).catch(err => {
          res.send({
            message: `注册失败，${err}`,
            flag: false
          });
        });
      });
    });
  },
};
