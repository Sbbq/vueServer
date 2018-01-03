var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var roomSchema=new Schema({
	"roomNum":{type:String},
	"roomPrice":Number,
	"checked":Boolean,
	"bed":Number,
});
module.exports=mongoose.model("room",roomSchema);