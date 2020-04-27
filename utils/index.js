const os = require('os');
const qs = require('querystring');

/**
 * 获取 post 数据
 * @param req
 * @param callback
 */
function getPostBody(req, callback) {
  let arr = [];
  req.on('data', function (chunk) {
    // 提交的数据类型是 Buffer对象
    arr.push(chunk);
  });

  req.on('end', function () {
    // 组装数据
    let postBody = Buffer.concat(arr).toString('utf8');
    if (postBody.split("&").length > 1) {
      postBody = qs.parse(postBody);
    } else {
      postBody = JSON.parse(postBody);
    }
    callback(postBody);
  });
}

// 获取本机 ip 地址
function getIPAddress() {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

module.exports = {
  getPostBody,
  getIPAddress
};
