/**
 * customer.js
 * 
 * 用户管理路由文件
 */
const express = require('express')
const router = express.Router()

const { pool } = require('../config/mysql')

router.get('/users', (req, res) => {
  const { page, size, customerAccount, customerGender, isValid } = req.query
  console.log({ page, size, customerAccount, customerGender, isValid });
  let conditionSql = ''
  let totalCount = 0
  let countSql =
    `select count(1) as count from express_study_db.customer where customer_account like '%${customerAccount}%'`
  if (customerGender) {
    conditionSql += ` and customer_gender = '${customerGender}'`
  }
  if (isValid) {
    conditionSql += ` and is_valid = '${isValid}'`
  }
  countSql += conditionSql
  console.log(countSql);

  let sql =
    `select customer_id as customerId, customer_account as customerAccount, customer_name as customerName, customer_gender as customerGender, is_valid as isValid from express_study_db.customer where customer_account like '%${customerAccount}%'`
  sql += conditionSql
  sql += ` limit ${page * size}, ${size}`
  console.log(sql);

  // 查询总数
  pool.query(
    countSql,
    (err, result, fields) => {
      if (err) throw err;
      console.log(result);
      totalCount = result[0].count

      // 查询列表
      pool.query(
        sql,
        (err, result, fields) => {
          if (err) throw err;
          console.log(JSON.stringify(result))

          res.json({
            statusCode: 0,
            message: '成功',
            data: {
              list: result,
              page,
              size,
              totalCount,
            }
          })
        }
      )

    }
  )
});

/**
 * 新增用户
 */
router.post('/customer', (req, res) => {
  console.log(req.body);
  let { customerAccount, customerName, customerGender, customerPwd } = req.body

  if (!customerAccount) {
    res.json({
      statusCode: 1,
      message: '账号不能为空',
    })
    return
  }

  if (!customerName) {
    res.json({
      statusCode: 1,
      message: '姓名不能为空',
    })
    return
  }
  if (!customerGender) {
    res.json({
      statusCode: 1,
      message: '性别不能为空',
    })
    return
  }

  if (!customerPwd) {
    res.json({
      statusCode: 1,
      message: '密码不能为空',
    })
    return
  }
  const sql = `INSERT INTO express_study_db.customer
  (customer_account, customer_pwd, customer_name, customer_gender, is_valid)
  VALUES('${customerAccount}', '${customerPwd}', '${customerName}', '${customerGender}', 'Y');
  `
  console.log('sql >>', sql);

  // 操作数据库
  pool.query(
    sql,
    (err, result, fields) => {
      if (err) throw err;
      console.log(JSON.stringify(result))
      if (result.affectedRows) {
        res.json({
          statusCode: 0,
          message: '新增成功',
        })
      } else {
        res.json({
          statusCode: 1,
          message: '操作失败',
        })
      }
    }
  )
});


/**
 * 生效/失效用户
 */
router.post('/customer/:customerId', (req, res) => {
  // console.log(req.body);
  const { isValid } = req.body
  const customerId = req.params.customerId

  const sql = `UPDATE express_study_db.customer
    SET is_valid='${isValid}'
    WHERE customer_id=${customerId};
  `
  console.log('sql >>', sql);

  // 操作数据库
  pool.query(
    sql,
    (err, result, fields) => {
      if (err) throw err;
      console.log(JSON.stringify(result))
      if (result.affectedRows) {
        res.json({
          statusCode: 0,
          message: '操作成功',
        })
      } else {
        res.json({
          statusCode: 1,
          message: '操作失败',
        })
      }
    }
  )
});

/**
 * 查询某用户的信息
 */
router.get('/customer/:customerId', (req, res) => {
  const customerId = req.params.customerId

  let sql =
    `select customer_id as customerId, customer_account as customerAccount, customer_name as customerName, customer_gender as customerGender from express_study_db.customer where customer_id = ${customerId}`
  console.log(sql);

  pool.query(
    sql,
    (err, result, fields) => {
      if (err) throw err;
      console.log(JSON.stringify(result))

      res.json({
        statusCode: 0,
        message: '成功',
        data: result[0]
      })
    }
  )
})


/**
 * 修改用户
 */
router.put('/customer/:customerId', (req, res) => {
  const customerId = req.params.customerId

  console.log(req.body);
  let { customerAccount, customerName, customerGender } = req.body

  if (!customerAccount) {
    res.json({
      statusCode: 1,
      message: '账号不能为空',
    })
    return
  }

  if (!customerName) {
    res.json({
      statusCode: 1,
      message: '姓名不能为空',
    })
    return
  }
  if (!customerGender) {
    res.json({
      statusCode: 1,
      message: '性别不能为空',
    })
    return
  }

  const sql = `
    update
      express_study_db.customer
    set
      customer_account = '${customerAccount}',
      customer_name = '${customerName}',
      customer_gender = '${customerGender}'
    where
      customer_id = ${customerId};
  `
  console.log('sql >>', sql);

  // 操作数据库
  pool.query(
    sql,
    (err, result, fields) => {
      if (err) throw err;
      console.log(JSON.stringify(result))
      if (result.affectedRows) {
        res.json({
          statusCode: 0,
          message: '修改成功',
        })
      } else {
        res.json({
          statusCode: 1,
          message: '修改失败',
        })
      }
    }
  )
});

module.exports = router