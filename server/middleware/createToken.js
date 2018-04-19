const jwt = require('jsonwebtoken')
module.exports = function (name) {
    const expire = new Date();
    expire.setDate(expire.getDate() + 7);// expire day seven days
    const token = jwt.sign({
        name: name,
        exp: parseInt(expire.getTime() / 1000)
    },process.env.JWT_SECRET)
    return token;
  }
