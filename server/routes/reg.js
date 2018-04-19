require('dotenv').config()
const api           = require('../api');
const express       = require('express');
const router        = express.Router();
const sha1          = require('sha1');
const createToken   = require('../middleware/createToken');

router.post('/user/reg',function (req, res, next) {
    const name      = req.body.account;
    let password    = req.body.checkPass;
    password        = sha1(password);
    const user = {
      name: name,
      password: password
    }
    api.createUser(user)
      .then(() => {
        res.send({
          code: 200,
          token: createToken(name)
        })
      })
      .catch(err => {
        if (err.message.match('E11000 duplicate key')) {
          return res.json({
            code: -200,
            message: 'the username has exist'
          })
        }
        return res.json({
          code: -200,
          message: err.toString()
        })
      })
})
module.exports = router;
