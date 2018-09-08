module.exports = function (err) {
  return {
    status: 422,
    msg: err
  };
}