const Article 		= require('../lib/mongo').Article;
const Classify 		= require('../lib/mongo').Classify;
const User 				= require('../lib/mongo').User;
const Counters 		= require('../lib/mongo').Counters;

 // count data
  function getNextSequenceValue (sequenceName) {
    console.log(Counters.findAndModify.toString(), 34566);
   const sequenceDocument = Counters.findAndModify(
      {
         query:{id: sequenceName },
         update: {$inc:{sequence_value:1}},
         new:true
      });
   return sequenceDocument.sequence_value;
  }
module.exports = {
// Article

	// creat
	/*
	** method 1
	 createArticle: params => {
	 	return Article.create(params).exec();
	 },
	*/

	/*
	** method 2
	 createArticle: params => Article.create(params).exec(),
	*/

	createArticle (params) {
    console.log(params);
    const option = Object.assign({}, params, {articleId: getNextSequenceValue("articleId")});
    console.log(option, 'option');
		return Article.create(option).exec();
	},
	// get all articles
	getAllArticles (page, limit) {
		if (page && limit) {
			const skip = (page - 1) * limit;
			return Promise.all([
					Article.find().addCreateAt().sort({_id: -1}).skip(skip).limit(limit).exec(),
					Article.count().exec()
				])
		} else {
			return Article.find()
						.addCreateAt()
						.sort({_id: -1})
						.exec();
		}
	},
	// get all articles title list
	getAllArticlesTitle (page, limit) {
		if (page && limit) {
			const skip = (page - 1) * limit;
			return Promise.all([
					Article.find().select({title: 1}).addCreateAt().sort({_id: -1}).skip(skip).limit(limit).exec(),
					Article.count().exec()
				])
		} else {
			return Article.find()
						.addCreateAt()
						.sort({_id: -1})
						.exec();
		}
	},
	// get articles by classify
	getArticlesByClassify (page, limit, classify) {
		if (page && limit) {
			const skip = (page - 1) * limit;
			return Promise.all([
					Article.find({classify}).addCreateAt().sort({_id: -1}).skip(skip).limit(limit).exec(),
					Article.count().exec()
				])
		} else {
			return Article.find()
						.addCreateAt()
						.sort({_id: -1})
						.exec();
		}
	},
	// get an article
	getOneArticle (postId) {
		return Article.findOne({_id: postId})
					.addCreateAt()
					.exec();
	},
	// update an article
	updateArticle (postId, data) {
		return Article.update({_id: postId}, {$set: data}).exec();
	},
	// delete an article
	removeOneArticle (postId) {
		return Article.remove({_id: postId}).exec();
	},

	// classify

	// create an classify
	createClass (data) {
		return Classify.create(data).exec();
	},
	// update classify
	updateClass (classId, data) {
		return Classify.update({_id: classId}, {$set: data}).exec();
	},
	// remove Classify
	removeClass (classId) {
		return Classify.remove({_id: classId}).exec();
	},
	// find all classify
	findAllClass () {
		return Classify.find()
					.addCreateAt()
					.sort({_id: -1})
					.exec();
	},
	// user

	// create an user
	createUser (user) {
		return User.create(user).exec();
	},
	// find an user
	getUserByName (name) {
		return User.findOne({name: name}).exec();
	}
}