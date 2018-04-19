const api 									= require('../api');
const express 							= require('express');
const requiredParamVaild		= require('../middleware/requiredParamVaild');
const stringToNumber				= require('../middleware/stringToNumber');
const checkToken            = require('../middleware/checkToken');
const router 								= express.Router();

// create a new article
router.post('/article/create', (req, res) => {
	const {classify, title, content, contentToMark} = req.body;
		// required param valid
	if (requiredParamVaild({title, classify, content, contentToMark}, res)) {
		return
	}
	api.createArticle(req.body)
		.then(({result: {ok, n}, insertedIds}) => {
			if (ok && n > 0) {
				res.send({
					code: 200,
					message: 'success',
					articleId: insertedIds[0]
				})
			} else {
				throw new Error('fail');
			}
		})
		.catch(err => {
			res.send({
				code: -200,
				message: err.toString()
			})
		})
})

// get all articles
router.get('/article/articleList', (req, res, next) => {
	let {page, limit} = req.query;
	// required param valid
	if (requiredParamVaild({page, limit}, res)) {
		return
	}
	// string to number
	if (stringToNumber({page, limit}, res)) {
		return
	}
	
	limit = parseInt(limit);
	page  = parseInt(page);
	// page == 0 && (page = 1);
	api.getAllArticles(page, limit)
		.then((result) => {
			const articleList = result[0],
						total = result[1],
						totalPage = Math.ceil(total / limit),
						hasNext = totalPage > page ? true : false,
						hasPrev = page > 1
			res.send({
				code: 200,
				articleList,
				totalPage,
				hasNext,
				hasPrev
			})
		})
		.catch(err => {
			res.send({
				code: -200,
				message: err.toString()
			})
		})
})

// getArticleList by classify
router.get('/article/getArticleListByClassify', function (req, res, next) {
	let {classify, page, limit} = req.query;
	// required param valid
	if (requiredParamVaild({page, limit, classify}, res)) {
		return
	}
	// string to number
	if (stringToNumber({page, limit}, res)) {
		return
	}
	limit = parseInt(limit);
	page = parseInt(page);
	api.getArticlesByClassify(page, limit, classify)
		.then((result) => {
			const articleList = result[0],
						total = result[1],
						totalPage = Math.ceil(total/limit),
						hasNext = totalPage > page ? true : false,
						hasPrev = page > 1
			res.send({
				code: 200,
				articleList,
				totalPage,
				hasNext,
				hasPrev
			})
		})
		.catch(err => {
			res.send({
				code: -200,
				message: err.toString()
			})
		})
})
// get one article by id
router.get('/article/getOneArticle',function (req, res, next) {
	const {id} = req.query
		// required param valid
	if (requiredParamVaild({id}, res)) {
		return
	}
  api.getOneArticle(id)
      .then((oneArticle) => {
        if (oneArticle) {
          res.send({
            code: 200,
            oneArticle
          })
        } else {
          throw new Error('not find article');
        }
      })
      .catch(err => {
        res.send({
          code: -200,
          message: err.toString()
        })
      })
})

// update an article by id
router.post('/article/edit', function (req, res, next) {
	const {id, classify, title, content, contentToMark} = req.body;
		// required param valid
	if (requiredParamVaild({id, title, classify, content, contentToMark}, res)) {
		return
	}
  api.updateArticle(id, {classify, title, content, contentToMark})
  .then(({result: {ok, n}}) => {
    if (ok && n > 0) {
      res.send({
        code: 200,
        message: 'edit success'
      })
    }else {
      throw new Error('edit fail');
    }
  })
  .catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
})

module.exports = router