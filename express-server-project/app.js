/**
 * app.js
 */
const express = require('express')
const app = express()
const port = 8082

// 解析 application/json，否则取不到body中的数据
app.use(express.json())
// 解析 application/x-www-form-urlencoded，以获取表单提交的数据
app.use(express.urlencoded({ extended: false }))

// cors 跨域配置
const cors = require('./config/cors')
app.use(cors)


// 需在路由前使用，才能记录正常的日志
app.use(require('./config/winston').logger)

// 校验 JWT 的全局中间件
app.use(require('./middle-ware/global').jwtValidMiddleWare)

app.use(require('./routes/login'))
app.use(require('./routes/admin'))

// 错误的日志记录则需放在最后
app.use(require('./config/winston').errorLogger)

// 异常中间件，需放在最后
app.use(require('./middle-ware/error').errMiddleWare)

app.listen(port, () => {
  console.log(`app is running at http://localhost:${port}`)
})