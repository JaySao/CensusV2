const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Database
mongoose.connect('mongodb://localhost/censusdb');
let db = mongoose.connection;
db.on('error', (err)=>{
  console.log(err);
});
db.once('open',()=>{
  console.log("Connected to Mongo");
});
//

//Models
let Poll = require('./models/poll');



//Routes
app.get('/poll/:id', (req, res)=>{
  Poll.findById(req.params.id, (err, poll)=>{
    console.log(poll);
    if(err){
      console.log(err);
    }
    else{
      res.render('pollView',{
        poll: poll
      });
    }
  })
});
app.get('/', (req, res)=>{
  res.render('index', {
    title: 'Census Landing Page',
    message:'Make a Poll'
  })
});

app.post('/poll/:id', (req,res)=>{
  let query = {_id:req.params.id}
  console.log(req.body.choice);
  if(req.body.choice == "0"){
    console.log("in loop 0");
    Poll.update(query, {$inc: {"results.0":1}},(err)=>{
      if(err){
        console.log(err);
        return;
      }
      else{
        res.redirect('/poll');
      }
    })
  }
  else if(req.body.choice == "1"){
    console.log("in loop 1");
    Poll.update(query, {$inc: {"results.1":1}},(err)=>{
      if(err){
        console.log(err);
        return;
      }
      else{
        res.redirect('/poll');
      }
    })
  }
  else if(req.body.choice == "2"){
    console.log("in loop 2");
    Poll.update(query, {$inc: {"results.2":1}},(err)=>{
      if(err){
        console.log(err);
        return;
      }
      else{
        res.redirect('/poll');
      }
    })
  }
  else if(req.body.choice == "3"){
    console.log("in loop 3");
    Poll.update(query, {$inc: {"results.3":1}},(err)=>{
      if(err){
        console.log(err);
        return;
      }
      else{
        res.redirect('/poll');
      }
    })
  }else{
    alert("Please check a box!");
  }
  // Poll.update(query, {question:"Newest question"},(err)=>{
  //   if(err){
  //     console.log(err);
  //     return;
  //   }
  //   else{
  //     res.redirect('/poll');
  //   }
  // })
});


app.post('/', (req,res)=>{
  console.log('Post recieved');
  let poll = new Poll();
  poll.question = req.body.question;
  console.log(poll.question);
  poll.choices[0]=String(req.body.answer0);
  poll.choices[1]=String(req.body.answer1);
  poll.choices[2]=String(req.body.answer2);
  poll.choices[3]=String(req.body.answer3);
  poll.results = [0,0,0,0];
  poll.key = req.body.key;
  poll.save((err)=>{
    if(err){
      console.log(err);
      return;
    }
    else{
      res.redirect('/poll');
    }
  })
});

app.get('/poll',(req,res)=>{
  Poll.find({},(err, polls)=>{
    if(err){
      console.log(err);
    }
    else{
      res.render('poll',{
        polls: polls
      })
    }
  });
});


app.listen(port, ()=>{
  console.log("Connected on port "+port);
});
