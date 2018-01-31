var mongoose=require('mongoose')
var Schema = mongoose.Schema;
var userSchema=new Schema({
	"name":String,
	"pwd":String,
	"nation":String,
	"address":String,
	"userId":String,
	"roomList":[
	{
		"roomNum":String,
		"roomPrice":String,
		"counts":Number,
	}
	]
});
module.exports=mongoose.model("users",userSchema);