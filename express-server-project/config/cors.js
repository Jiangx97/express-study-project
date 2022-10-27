/**
 * cors.js
 * cors跨域配置
 */
var cors = require('cors')

var corsOptions = {
  origin: '*', // 默认："*"

  // some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // 默认："GET,HEAD,PUT,PATCH,POST,DELETE"
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],

  // 如果没有指定，默认为请求的Access-Control-Request-Headers头中的报头
  // allowedHeaders: [
  //   'Accept',
  //   'Accept-Language',
  //   'Content-Language',
  //   'DPR',
  //   'Downlink',
  //   'Save-Data',
  //   'Viewport-Width',
  //   'Width',
  //   'Content-Type'
  // ],

  // Pass the CORS preflight response to the next handler.
  preflightContinue: false,
}

module.exports = cors(corsOptions)