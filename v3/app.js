const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const port = 3000;


//DB connection
mongoose.connect("mongodb://localhost:27017/censusdb");
let db = mongoose.connection;
db.on('error', (err)=>{
    console.log(err);
});
db.once('open',()=>{
    console.log("Connected to Mongo");
});

//Cors
app.use(cors());

//Model
let Poll = require('./models/poll');

//Body Parser
app.use(bodyParser.json());

//Default route
app.get('/', (req,res)=>{
    res.send('Invalid Endpoint');
})

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Start server
app.listen(port, ()=>{
    console.log("Server started on port " + port);
})


//Routes
app.post('/make',(req,res)=>{
    console.log("Making poll");
    let choicesArray = new Array(req.body.choices.length);
    let resultsArray = new Array(req.body.choices.length);
    for(let i=0; i<req.body.choices.length; i++){
        choicesArray[i] = req.body.choices[i];
        resultsArray[i] = 0;
    }
    let newPoll = new Poll({
        question: req.body.question,
        choices: choicesArray,
        results: resultsArray,
        key: req.body.key
    })

    Poll.addPoll(newPoll, (err,user)=>{
        if(err){
            res.json({success:false, msg:'Failed to create poll', error: err})
        }
        else{
            console.log("Poll created")
            res.json({success:true, msg:'Poll created', newPoll})
        }
    })
})

app.get('/poll/:id', (req, res)=>{
    Poll.findById(req.params.id, (err, poll)=>{
      if(err){
        console.log(err);
      }
      else{
        res.json({success:true, msg:'Poll recieved', poll})
      }
    })
  });






app.post('/poll/:id', (req, res)=>{
    let query = {_id:req.params.id}
    console.log(req.body.choice);

    switch(req.body.choice){
    case 0:
        Poll.update(query, {$inc: {"results.0":1}},(err)=>{
            if(err){
                console.log(err);
                return;
            }
            else{
            console.log("successful post")
            // console.log(res)
            res.json({success:true})
                //   res.redirect('/results/'+req.params.id);
            }
            })
    break;
    case 1:
    Poll.update(query, {$inc: {"results.1":1}},(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
        console.log("successful post")
        // console.log(res)
        res.json({success:true})
            //   res.redirect('/results/'+req.params.id);
        }
        })
    break;
    case 2:
    Poll.update(query, {$inc: {"results.2":1}},(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
        console.log("successful post")
        // console.log(res)
        res.json({success:true})
            //   res.redirect('/results/'+req.params.id);
        }
        })
    break;
    case 3:
    Poll.update(query, {$inc: {"results.3":1}},(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
        console.log("successful post")
        // console.log(res)
        res.json({success:true})
            //   res.redirect('/results/'+req.params.id);
        }
        })
    break;
    case 4:
    Poll.update(query, {$inc: {"results.4":1}},(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
        console.log("successful post")
        // console.log(res)
        res.json({success:true})
            //   res.redirect('/results/'+req.params.id);
        }
        })
    break;
    case 5:
    Poll.update(query, {$inc: {"results.5":1}},(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
        console.log("successful post")
        // console.log(res)
        res.json({success:true})
            //   res.redirect('/results/'+req.params.id);
        }
        })
    break;
    case 6:
    Poll.update(query, {$inc: {"results.6":1}},(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
        console.log("successful post")
        // console.log(res)
        res.json({success:true})
            //   res.redirect('/results/'+req.params.id);
        }
        })
    break;
    case 7:
    Poll.update(query, {$inc: {"results.7":1}},(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
        console.log("successful post")
        // console.log(res)
        res.json({success:true})
            //   res.redirect('/results/'+req.params.id);
        }
        })
    break;
    case 8:
    Poll.update(query, {$inc: {"results.8":1}},(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
        console.log("successful post")
        // console.log(res)
        res.json({success:true})
            //   res.redirect('/results/'+req.params.id);
        }
        })
    break;
    case 9:
    Poll.update(query, {$inc: {"results.9":1}},(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
        console.log("successful post")
        // console.log(res)
        res.json({success:true})
            //   res.redirect('/results/'+req.params.id);
        }
        })
    break;
    case 10:
    Poll.update(query, {$inc: {"results.10":1}},(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
        console.log("successful post")
        // console.log(res)
        res.json({success:true})
            //   res.redirect('/results/'+req.params.id);
        }
        })
    break;
    }
});

