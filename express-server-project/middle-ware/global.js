/**
 * global.js
 * 全局中间件的定义
 */

const { expressjwt } = require('express-jwt')

const jwtValidMiddleWare =
  expressjwt({
    secret: 'keykeykey',
    algorithms: ['HS256'],
    // 是否允许无 Token 请求，若无 token 则不解析/抛异常
    // // credentialsRequired: false,

    // 默认的是解析header中authorization的值，且是'Brarer '后的token字符串

    // // 自定义解析token的逻辑
    // getToken: function fromHeaderOrQuerystring(req) {
    //   if (
    //     req.headers.authorization &&
    //     req.headers.authorization.split(" ")[0] === "Bearer"
    //   ) {
    //     return req.headers.authorization.split(" ")[1];
    //   } else if (req.query && req.query.token) {
    //     return req.query.token;
    //   }
    //   return null;
    // },

    // 如果解析成功，默认解析结果会赋值在 req.user，可通过 requestProperty 来修改
    // requestProperty: 'auth'
  })
    // 除了 '/login' 路由，其他接口需校验token
    .unless({ path: [/\/login/] })


module.exports = {
  jwtValidMiddleWare
}