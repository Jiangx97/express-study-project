const express = require('express')
const router = express.Router()
const { pool } = require('../config/mysql')

var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
  console.log(req.body);
  let { account, pwd, role } = req.body

  if (!account) {
    res.json({
      statusCode: 401,
      message: '账号不能为空',
    })
    return
  }

  if (!pwd) {
    res.json({
      statusCode: 401,
      message: '密码不能为空',
    })
    return
  }

  if (!role) {
    res.json({
      statusCode: 401,
      message: '角色不能为空',
    })
    return
  }

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(pwd, 'secret key 666');
  pwd = bytes.toString(CryptoJS.enc.Utf8);
  // console.log(account, pwd, role);

  const sql = role === 'admin' ?
    `select admin_id, admin_pwd, admin_account, admin_name, admin_gender, is_valid from express_study_db.admin where admin_account = '${account}' and is_valid = 'Y'`
    : `select customer_id, customer_pwd, customer_account, customer_name, customer_gender, is_valid from express_study_db.customer where customer_account = '${account}' and is_valid = 'Y'`

  // 查询数据库
  pool.query(
    sql,
    (err, result, fields) => {
      if (err) throw err;
      console.log(JSON.stringify(result))
      if (result.length) {
        let pList
        if (role === 'admin') {
          pList = result.filter(el =>
            pwd === CryptoJS.AES.decrypt(el.admin_pwd, 'secret key 666').toString(CryptoJS.enc.Utf8)
          )
        } else if (role === 'customer') {
          pList = result.filter(el =>
            pwd === CryptoJS.AES.decrypt(el.customer_pwd, 'secret key 666').toString(CryptoJS.enc.Utf8)
          )
        }
        if (pList.length !== 1) {
          res.json({
            statusCode: 401,
            message: '账号或密码有误',
          })
          return
        }
        const p = pList[0]
        const secretKey = 'keykeykey'
        if (role === 'admin') {
          // 删除'密码'属性
          delete p.admin_pwd
          // 增加 JWT token
          p.token = jwt.sign({ account: p.admin_account }, secretKey, { expiresIn: '1800000' }) // 30min
        } else if (role === 'customer') {
          // 删除'密码'属性
          delete p.customer_pwd
          // 增加 JWT token
          p.token = jwt.sign({ account: p.customer_account }, secretKey, { expiresIn: '1800000' }) // 30min
        }
        res.json({
          statusCode: 0,
          message: '登录成功',
          data: p
        })
      } else {
        res.json({
          statusCode: 401,
          message: '账号或密码有误',
        })
      }
    }
  )
});


module.exports = router