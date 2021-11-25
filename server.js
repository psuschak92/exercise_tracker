const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const User = require('./models/User.js').User;
const Exercise = require('./models/Exercise.js').Exercise;
const Log = require('./models/Log.js').Log;
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/users', (req,res,next) => {
    User.find({}, (err, users) => {
        if(err) return next(err);
        res.json({users});
    });
});

app.post('/api/users', (req,res,next) => {
    const user = new User({username: req.body.username});
    user.save((err, user) => {
        if(err) return next(err);
        const log = new Log({userid: user._id, username: user.username,count: 0, logs: []});
        log.save((err, log) => {
            if(err) return next(err);
        });
        res.json({username: user.username, _id: user._id});
    });
});

app.post('/api/users/:id/exercises',(req,res,next) => {
    const uid = req.params.id;
    const desc = req.body.description;
    const dur = req.body.duration;
    let time;
    if(!req.body.date) {
        time = new Date();
        time = time.toDateString();
    } else {
        let dateArr = req.body.date.split('-');
        // js counts months 0 to 11
        time = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
        time = time.toDateString();
    }

    User.findById({_id: uid}, (err, user) => {
        const exercise = new Exercise({userid: uid, username: user.username,description: desc, duration: dur, date: time});
        exercise.save((err, exercise) => {
            if(err) return next(err);
            Log.find({userid: exercise.userid}, (err, log) => {
                if(err) return next(err);
                // console.log(log);
                log[0].logs.push({description: exercise.description, duration: exercise.duration, date: exercise.date});
                log[0].count = log[0].logs.length;
                log[0].save((err, data) => {
                    if(err) return next(err);
                });
            });
            res.json({userid: exercise.userid, username: user.username, description: exercise.description, duration: exercise.duration, date: exercise.date});
        });
    });
});

app.get('/api/users/:id/logs', (req,res,next) => {
   Log.find({userid: req.params.id}, (err, log) => {
        if(err) return next(err);
        res.json({userid: log[0].userid, count: log[0].count, logs: log[0].logs});
   }); 
});

app.listen(PORT,()=> {
    console.log('Server listening at localhost:' + PORT);
});