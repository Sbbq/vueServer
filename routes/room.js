var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room=require("../models/room");

mongoose.connect("mongodb://zk:123456@localhost/zkTest");
mongoose.connection.on("connected", function () {
	console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
	console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
	console.log("MongoDB connected disconnected.")
});

router.get("/list",function(req,res,next){
	let page=parseInt(req.query.page);
	let pageSize=parseInt(req.query.pageSize);
	let priceUp=parseInt(req.query.priceUp);
	let priceDown=parseInt(req.query.priceDown);
	let sortFlag;
	if(req.query.sortFlag=="true")sortFlag=1;
	if(req.query.sortFlag=="false")sortFlag=-1;
	let skip=(page-1)*pageSize;
	let params={
		roomPrice:{
			$gt:priceDown,
			$lte:priceUp
		}
	};
	Room.find(params).skip(skip).limit(pageSize).sort({roomPrice:sortFlag}).exec(function(err,result){
		if(err){
			res.json({
				status:"1",
				message:err.message
			})
		}
		else{
			res.json({
				status:"0",
				message:"",
				room:result
			})
		}
	})
})

module.exports = router;
