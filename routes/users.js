var express = require('express');
var router = express.Router();
var Users=require('./../models/users')
/* GET users listing. */

router.post('/login', function(req, res, next) {
	let params={
		name:req.body.userName,
		pwd:req.body.userPwd
	}
	Users.findOne(params,function(err,result){
		if(err){
			res.json({
				status:"1",
				message:err.message
			})
		}
		else{
			if(result){
				res.cookie("userId",result.userId,{
					path:'/',
					maxAge:1000*60*60
				});
				res.cookie("userName",result.name,{
					path:'/',
					maxAge:1000*60*60
				});
				res.json({
					status:"0",
					message:"",
					result:{
						userName:result.name
					}
				})
			}
		}
	})
});
router.post('/logout', function(req, res, next) {
	res.cookie("userId","",{
		path:'/',
		maxAge:-1
	});
	res.json({
		status:"0",
		message:"",
		result:""
	})
});

module.exports = router;
