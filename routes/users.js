var express = require('express');
var router = express.Router();
var Users=require('./../models/users')
var Room=require('./../models/room')
/* GET users listing. */

router.get('/',function(req,res,next){
	res.json({
		status:"0",
		message:""
	});
})

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
router.get('/checkLogin', function(req, res, next) {
	if(req.cookies.userId){
		res.json({
			status:"0",
			message:"",
			result:req.cookies.userName
		})
	}
	else{
		res.json({
			status:"1",
			message:"未登录",
			result:""
		})
	}
});

router.post('/addRoom',function(req,res,next){
	let roomNum=req.body.roomNum;
	Users.findOne({name:req.cookies.userName},function(err,result){
		if(err){
			res.json({
				status:"1",
				message:err.message
			})
		}else{
			if(result){
				let flag=false;
				result.roomList.forEach(item=>{
					if(roomNum==item.roomNum){
						item.counts++;
						flag=true;
					}
				})
				if(flag==true){
					result.save(function(err1,a){
						if(err1){
							res.json({
								status:"1",
								message:err1.message
							})
						}else{
							res.json({
								status:"0",
								message:"",
								result:"success"
							})
						}
					})
				}else{
					Room.findOne({roomNum:roomNum},function(err2,doc){
						if(err2){
							res.json({
								status:"1",
								message:err2.message
							})
						}else{
							result.roomList.push({roomNum:doc.roomNum,roomPrice:doc.roomPrice,counts:1});
							result.save(function(err3,doc2){
								if(err3){
									res.json({
										status:"1",
										message:err3.message
									})
								}else{
									res.json({
										status:"0",
										message:"",
										result:"success"
									})
								}
							})
						}
					})
				}
			}
		}
	})
})

router.get('/roomCart',function(req,res,next){
	Users.findOne({name:req.cookies.userName},function(err,userDoc){
		if(err){
			res.json({
				status:"1",
				message:err.message
			})
		}else{
			res.json({
				status:'0',
				message:"",
				result:userDoc.roomList
			})
		}
	})
})

router.post('/delRoom',function(req,res,next){
	let roomId=req.body.roomId;
	Users.update({
		name:req.cookies.userName
	},{
		$pull:{
			"roomList":{
				'roomNum':roomId
			}
		}
	},function(err,result){
		if(err){
			res.json({
				status:"1",
				message:err.message
			})
		}else{
			res.json({
				status:"0",
				message:"",
				result:"success"
			})
		}
	})
})

router.post('/editRoom',function(req,res,next){
	let roomId=req.body.roomId;
	let roomCount=req.body.roomCount;
	Users.update({
		name:req.cookies.userName,
		"roomList.roomNum":roomId,
	},{
		"roomList.$.counts":roomCount
	},function(err,result){
		if(err){
			res.json({
				status:"1",
				message:err.message
			})
		}else{
			res.json({
				status:"0",
				message:"",
				result:"success"
			})
		}
	})
})

module.exports = router;
