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
    required:true
  }
});

let Poll = module.exports = mongoose.model('Poll', pollSchema);
