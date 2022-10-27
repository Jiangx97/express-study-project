/**
 * error.js
 * 异常中间件的定义
 */
const errMiddleWare = function (err, req, res, next) {
  console.log('\n', err);
  // token 解析失败抛出的错误
  if (err.name === 'UnauthorizedError') {
    res.json({
      statusCode: 401,
      message: '无效Token，请重新登录!'
    })
    return
  }

  res.json({
    statusCode: 500,
    message: '服务器错误'
  })
}

module.exports = {
  errMiddleWare
}