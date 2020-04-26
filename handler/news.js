const {getPostBody} = require("../utils/index.js");
const {readFile, writeFile} = require("../utils/file.js");

module.exports = {
  addGet(req, res) {
    readFile(function (list) {
      req.query.id = (list.length ? Math.max.apply(null, list.map(function (o) {
        return o.id
      })) : 0) + 1;
      req.query.time = new Date().toUTCString();
      list.push(req.query);

      writeFile(JSON.stringify(list), function () {
        res.redirect('/');
      });

    });
  },
  addPost(req, res) {
    // post 的数据量过大时会分多次提交，每次提交都会触发req.on('data')，提交完成会触发req.on('end')
    readFile(function (list) {
      getPostBody(req, function (postBody) {
        postBody.id = (list.length ? Math.max.apply(null, list.map(function (o) {
          return o.id
        })) : 0) + 1;
        postBody.time = new Date().toUTCString();
        list.push(postBody);

        writeFile(JSON.stringify(list), function () {
          res.redirect('/');
        });

      });
    });
  },
};
