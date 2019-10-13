const express = require('express');
const line = require('@line/bot-sdk');
const request = require('request')
require('dotenv').config();
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./demo1.sqlite", err => {
    console.log(err);
})
// console.log(MSG.data1)
//console.log(address.MSG);

const data = {
    id: null
}
app.get('/data', (req, res) => {
    db.all("SELECT * FROM question", [], (err, row) => {
        // console.dir(row);
        data.id = JSON.stringify(row)
        row.map((item) => { console.dir(item) })
    });
    res.setHeader('Content-Type', 'application/json');
  res.send(data.id)
})





const config = {
    channelAccessToken: 'TbEv2xd8cmH6YZ+9FhI6IGgK9sq9iEFqSLGZzWUlhn7/9oYu8YlBI+JlTEFDho+7ai916qqzYFeSncTaIEFF2e6DHeBZsVqp7wIlTDGb2FBR+5TIxBgvhTestwRXMVM7ZMUIC66VMWKAqTtlp368HwdB04t89/1O/w1cDnyilFU=',
    channelSecret: '87aa2aa19807d50703ab7cc38f839695'
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {

    let msg = {
        type: 'text',
        text: 'dffd'
    };

    let eventText = event.message.text.toLowerCase();

    
    if (eventText === 'report') {


        db.all("SELECT * FROM question", [], (err, row) => {
            // console.dir(row);
            data.id = JSON.stringify(row)
            // row.map((item) => { console.dir(item) })
        });
        request({
            method: 'POST',
            uri: 'https://notify-api.line.me/api/notify',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                bearer: 'WWfQVqxh4p9lb6q97aDEk3p5HgxGIeBFjQUyiuto7SK', //token
            },
            form: {
                message: this is eventext=${data.id}, //ข้อความที่จะส่ง
            },
        }, (err, httpResponse, body) => {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        })

        msg={
            'type':'text',
            'text':data.id
        }
        
    }  
    else {
        
        msg = {
            type: 'text',
            text: 'น้องบอทไม่เข้าใจที่คุณถามมา กรุณาเลือกใช้เมนูด้านล่างได้เลยครับ'
        };
        if (eventText!== "hello, world" && eventText!== null) {
            db.all("INSERT INTO  question(question) VALUES(?)", [eventText], (err) => {
                if(err) console.dir(err.message);
    
            });
        }
      
    }

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});