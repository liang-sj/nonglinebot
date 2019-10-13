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
    channelAccessToken: 'YkZGtrwVjbIvgZ43HG/pjYt4MVkSqR+AoJnIwA3I6KIN9rAn7rhfiyS/xBNPpBzLdsRv8TUMGUoJWtqkxJyjhYoGU5tnggnMS3FIb3LN2Y12+f8f6Mh+g7klJ5vlpMcsMM8HgWQZyoR9kEZY1sK8rwdB04t89/1O/w1cDnyilFU=',
    channelSecret: '8c20af89ebb7d39abac37ac9c5d5055b'
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
                bearer: 'cEpq67bFPhAzhqYvfXDSVisVCTIoiROZS6q9VurykMX', //token
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
