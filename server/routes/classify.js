const express               = require('express');
const api                   = require('../api');
const router                = express.Router();
const requiredParamVaild		= require('../middleware/requiredParamVaild');
const stringToNumber				= require('../middleware/stringToNumber');
// create an new class
router.post('/classify/create', (req, res, next) => {
  const {classify} = req.body;
		// required param valid
	if (requiredParamVaild({classify}, res)) {
		return
	}
  api.createClass(req.body)
  .then(({result: {ok, n}}) => {
    if (ok && n > 0) {
      res.send({
        code: 200,
        message: 'success'
      })
    } else {
      throw new Error('create fail');
    }
  })
  .catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
})
// remove an class
router.post('/classify/remove', (req, res, next) => {
  const {id}  = req.body;
  if (requiredParamVaild({id}, res)) {
		return
	}
  api.removeClass(id)
  .then(({result: {ok, n}}) => {
    if (ok && n > 0) {
      res.send({
        code: 200,
        message: 'success'
      })
    } else {
      throw new Error('the classify is not exist')
    }
  })
  .catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
})

// update an class
router.post('/classify/edit', (req, res, next) => {
  const id = req.body.id;
  const classify = req.body.classify
  if (requiredParamVaild({id, classify}, res)) {
		return
	}
  api.updateClass(id, {classify: classify})
  .then(({result: {ok, n}}) => {
    if (ok && n > 0) {
      res.send({
        code: 200,
        message: 'edit success'
      })
    } else {
      throw new Error('edit fail');
    }
  })
  .catch( err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
})

// get all class
router.get('/classify/lists', (req, res, next) => {
  api.findAllClass()
  .then((lists) => {
    res.send({
      code: 200,
      lists
    })
  })
  .catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
})

module.exports = router;
