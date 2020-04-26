const path = require('path');
const ejs = require('ejs');
const {getPostBody} = require("../utils/index.js");
const {readFile, writeFile} = require("../utils/file.js");
const {db_user} = require("../utils/db.js");
const rootPath = process.cwd();

module.exports = {
  index(req, res) {
    readFile(function (data) {
      res.render('index', {list: data}, function (err, result) {
        if (err) {
          throw err;
        }
        res.send(result);
      });
    });
  },
  detail(req, res) {
    readFile(function (list) {
      let obj = list.find(item => item.id === Number(req.query.id));
      if (obj) {
        ejs.renderFile(path.join(rootPath, 'views', 'detail.html'), obj, function (err, result) {
          if (err) {
            throw err;
          }
          res.send(result);
        });
      } else {
        res.end('No such Item');
      }
    });
  },
  add(req, res) {
    res.sendFile(path.join(rootPath, 'views', 'add.html'));
  },
  favicon(req, res) {
    res.sendFile(path.join(rootPath, 'favicon.png'));
  }
};
