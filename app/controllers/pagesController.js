var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var pagesController = new Controller();

pagesController.main = function() {
  this.title = 'NewsDucks';
  this.render();
}

module.exports = pagesController;
