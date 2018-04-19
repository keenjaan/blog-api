module.exports = function (option, res) {
	const arr = [];
	for(const key in option) {
		if (option[key] === undefined) {
			arr.push(key);
		} 
	}
	if (arr.length > 0) {
		res.send({
			code: -200,
			message: `${arr.join(',')} is required`
		})
		return true
	} 
}