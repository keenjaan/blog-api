// check the token
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  const token = req.headers['authorization']
  // 支持一个账号多端登录
  // 如果一个账号支持唯一端登录，应生成唯一钥密存数据库，每次重新登录生成新钥密覆盖原有钥密。
  if (token) {
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    if (decoded.exp > Date.now() / 1000) {
      next();
    } else {
      return  res.send({
        code: 401,
        message: "授权已经过期，请重新登录"
      })
    }
  } else {
    return res.send({
      code: 401,
      message: '你还没有登录，请登录'
    })
  }
}
