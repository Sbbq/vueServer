var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/b', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/c', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/d',function(req,res,next){
	res.send("aaa");
})

module.exports = router;
