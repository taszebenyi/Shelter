const sanitizePost = function(req, res, next) {
  req.body.post.content = req.sanitize(req.body.post.content);
  req.body.post.title = req.sanitize(req.body.post.title);
  req.body.post.image = req.sanitize(req.body.post.image);
  // req.body.author._id = req.sanitize(req.body.author._id);
  // req.body.author.email = req.sanitize(req.body.author.email);
  next();
}

const sanitizeUser = function(req, res, next) {
  req.body.email = req.sanitize(req.body.email);
  req.body.password = req.sanitize(req.body.password);
  next();
}

module.exports = {sanitizePost, sanitizeUser}
