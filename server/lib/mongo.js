const Mongolass 					= require('mongolass');
const mongolass 					= new Mongolass();
const moment							= require('moment');
const objectIdToTimestamp	= require('objectid-to-timestamp');

mongolass.connect('mongodb://localhost:27017/mytest');
// create time stamp by id
mongolass.plugin('addCreateAt', {
	afterFind (results) {
		results.forEach((item) => {
			item.create_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm:ss');
		})
		return results
	},
	afterFindOne (result) {
		if (result) {
			result.create_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm:ss');
		}
		return result
	}
})
// Article
exports.Article = mongolass.model('Article', {
  article:      {type: 'number'},
	classify: 		{type: 'string'},
	title: 			{type: 'string'},
	content: 		{type: 'string'},
	contentToMark: 	{type: 'string'}
})
exports.Article.index({_id: 1, classify: -1}).exec();

// Classify
exports.Classify = mongolass.model('Classify', {
	classify: {type: 'string'}
})
exports.Classify.index({_id:1}).exec();

// User
exports.User = mongolass.model('User', {
  name: {type: 'string'},
  password: {type: 'string'}
})
exports.User.index({name: 1}, {unique: true}).exec();

// counters
exports.Counters = mongolass.model('Counters', {
  id: {type: 'string'},
  sequence_value: {type: 'number'}
})
exports.Counters.index({_id: 1}).exec();
