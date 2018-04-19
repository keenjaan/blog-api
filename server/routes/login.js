require('dotenv').load();
const express       = require('express');
const router        = express.Router();
const api           = require('../api');
const createToken   = require('../middleware/createToken');
const sha1          = require('sha1');

router.post('/user/login',function (req, res, next){
  console.log(req.body.account);
  console.log(req.body.checkPass);

  const name        = req.body.account;
  const password    = sha1(req.body.checkPass);
  api.getUserByName(req.body.account)
    .then(function(user){
      if(user && (password === user.password)){
        // user has pass the valid
        res.json({
          code: 200,
          token: createToken(name)
        });
      }else{
        // user has not pass the valid
        res.json({
          code: -200,
          message: 'the username or the password is error'
        })
      }
    })
    .catch(err => {
      // error
      next(err)
      return res.json({
        code: -200,
        message: err.toString()
      })
    })
})
module.exports = router;
