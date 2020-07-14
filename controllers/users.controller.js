
var db = require("../db");
var shortid = require("shortid");

module.exports.index = function(req, res) {
  res.render("users", { users: db.get("users").value() });
} 

module.exports.update = function(req, res) {
  res.render("update", { name: req.params.name });
}
module.exports.postUpdate = function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .find({ name: req.params.name })
    .assign(req.body)
    .write();
  res.redirect("/users");
}
module.exports.postDelete = function(req, res) {
  db.get("users")
    .remove({ name: req.params.name })
    .write();
  res.redirect("/users");
}
module.exports.create = function(req, res) {
  res.render("create");
}
module.exports.postCreate = function(req, res) {
  var errors = [];
  if(req.body.name.length >= 31) {
    errors.push('the Length of the name is greater 30 characters');
    res.render("create", {
      errors: errors
    });
    return;
  }
  
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
}