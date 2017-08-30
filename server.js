const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment')();
const {lectureCheck, getCachedLectureAndSendNoti} = require('./lecture-apply');
const {Users} = require('./users');
const path = require('path');

const port = process.env.PORT || 3005;

let users = new Users();


var app = express();
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/lectures', (req, res) => {
    lectureCheck([req.query.id], result => {
        res.send(result);
    })
});

app.post('/register', (req, res) => {
    users.addUser ({ 
        token: req.body.token,
        major: req.body.major,
        course_number: req.body.course_number,
        lecture_info: req.body.lecture_info.trim(),
        lecture_subject: req.body.lecture_subject.trim()
    })

    // console.log(users.users);

    res.send(users.getUser(req.body.token));

});

app.get('/user', (req, res) => {
    // console.log(users.users);
    res.send(users.getUser(req.query.token));
});

app.post('/remove', (req, res) => {

    if (!users.hasUser(req.body.token)){
        res.send([]);
    }

    users.removeCourse(req.body.token, req.body.course_number);
    // console.log(req.body.course_number);
    
    res.send(users.getUser(req.body.token));
    // console.log(users.getUser(req.body.token));
});

app.get('/usersStatus', (req, res) => {
    if (req.query.admin === '11111') {
        res.send(users);
    } else {
        res.send('Not permitted!');
    }
})

app.get('/time', (req, res) => {
    res.send(moment.format('H:MM:SS'));
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

setInterval(getCachedLectureAndSendNoti.bind(null, users.majors, users.lectures, users.tokens, users.users), 3000);