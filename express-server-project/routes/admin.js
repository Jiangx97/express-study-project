const express = require('express')
const router = express.Router()

router.get('/home-info', (req, res) => {
  console.log(req.body);
  res.json({
    statusCode: 0,
    message: '测试正常',
    data: { page: 'home' }
  })
});


module.exports = router