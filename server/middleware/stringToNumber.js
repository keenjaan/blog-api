module.exports = function (option, res) {
  const arr = [];
  for(const key in option) {
    if (isNaN(Number(option[key]))) {
      arr.push(key);
    } else if (Number(option[key]) <= 0 || Number(option[key]) % 1 > 0) {
      arr.push(key)
    }
  }
  if (arr.length > 0) {
    res.send({
      code: -200,
      message: `${arr.join(', ')} must be a positive integer`
    })
    return true
  }
}