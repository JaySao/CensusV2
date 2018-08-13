let mongoose = require('mongoose');

//Schema
let pollSchema = mongoose.Schema({
  question:{
    type:String,
    required:true
  },
  choices:{
    type:Array,
    required:true
  },
  results:{
    type:Array,
    required:true
  },
  key:{
    type:String,
    required:false
  }
});

let Poll = module.exports = mongoose.model('Poll', pollSchema);

module.exports.getPollById = (id,callback)=>{
  Poll.findById(id,callback);
}

module.exports.addPoll = (newPoll,callback)=>{
  newPoll.save(callback);
}