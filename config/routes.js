// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
  this.root('pages#main');
  this.post('/login','auth#login');
  this.get('/home','auth#home');
  this.post('/createCountry','data#createCountry');
  this.post('/findCountry','data#findCountry');
  this.post('/deleteCountry','data#deleteCountry');
  this.post('/editCountry','data#editCountry');
  this.post('/createCity','data#createCity');
  this.post('/findCity','data#findCity');
  this.post('/deleteCity','data#deleteCity');
  this.post('/editCity','data#editCity');
  this.post('/createCategory','data#createCategory');
  this.post('/findcategory','data#findcategory');
  this.post('/deleteCategory','data#deleteCategory');
  this.post('/editCategory','data#editCategory');
  this.post('/socialid','data#socialid');
  this.get('/getCountryCity','data#getCountryCity');
  this.post('/createEvent','data#createEvent');
  this.post('/findEvent','data#findEvent');
  this.post('/getcategory','data#getcategory');
}
