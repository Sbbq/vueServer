var express = require('express');
var router = express.Router();
var request= require('request');

router.all('/',function(req,res,next){
	let options={
		hostname: 'http://20132k331h.51mypc.cn:50516/position_sdk/ModularUser/User/login',    
		port: 50516,    
		path: '/position_sdk/ModularUser/User/login',    
		method: 'POST',    
		headers: {    
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'    
		} 
	}
	let post_data = {    
		username: "admin",    
		password:"21232f297a57a5a743894a0e4a801fc3",
		http_api_version:"1.1.0"
	};
	request.post({url:options.hostname,body:JSON.stringify(post_data)},function acallback(err,res,body){
			if (err) {
				return console.error('upload failed:', err);
			}
			console.log('Upload successful!  Server responded with:', body);
		}
	)
})

module.exports = router;