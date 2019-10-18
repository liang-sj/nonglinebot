const express = require('express');
const line = require('@line/bot-sdk');
const request = require('request')
require('dotenv').config();
const app = express();
const { clientDB } = require("./connect");
// console.log(MSG.data1)
//console.log(address.MSG);

const data = {
    id: null,
    del: null
};
const IDB = "INSERT INTO question (question) VALUES ($1)";
const SDB = "select * from question";
clientDB.connect();
app.get("/data", (req, res) => {
    let result = [];
    clientDB.query(SDB, (err, resDB) => {
        result.push(resDB.rows);
        data.id = JSON.stringify(resDB.rows);
        if (err) throw err;
        for (let row of resDB.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(result)
        console.log(`this is = ${result}`);
    });
});




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

async function handleMessageEvent(event) {

    // let msg = {
    //     type: 'text',
    //     text: 'dffd'
    // };

    let eventText = event.message.text.toLowerCase();

    if (eventText === 'ขอที่อยู่') {
        let msg = {
            'type': 'text',
            text: address.MSG
        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'สอบถาม') {
        // console.dir();
        let msg = {
            'type': 'text',
            text: query.MSG
        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'สอบถามหน่อยครับ') {
        let msg = {
            'type': 'text',
            text: query.MSG

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'สอบถามหน่อยค่ะ') {
        let msg = {
            'type': 'text',
            text: query.MSG

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'ถามไรหน่อย') {
        let msg = {
            'type': 'text',
            text: query.MSG

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'สวัสดีครับ') {
        let msg = {
            'type': 'text',
            text: query.MSG
        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'สวัสดีค่ะ') {
        let msg = {
            'type': 'text',
            text: query.MSG

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'สวัสดี') {
        let msg = {
            'type': 'text',
            text: query.MSG
        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'หวัดดี') {
        let msg = {
            'type': 'text',
            text: query.MSG

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText.replace(/\s+/g, '').slice(0, 6) === "delete") {

        let delparams = eventText.slice(6, eventText.length);
        //  data.id=delparams
        await clientDB.query("DELETE FROM question WHERE id=$1", [delparams], (err, resDB) => {
            if (err) throw err;
            else {
                if (resDB.rowCount) {
                    data.del = "Delete success"
                    let msg = {
                        type: "text",
                        text: data.del
                    };
                    request(
                        {
                            method: "POST",
                            uri: "https://notify-api.line.me/api/notify",
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            auth: {
                                bearer: "cEpq67bFPhAzhqYvfXDSVisVCTIoiROZS6q9VurykMX" //token
                            },
                            form: {
                                message: `this is eventext=${data.del}` //ข้อความที่จะส่ง
                            }
                        },
                        (err, httpResponse, body) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(body);
                            }
                        }
                    );
                    return client.replyMessage(event.replyToken, msg);
                }
                else {
                    data.del = "Delete error"
                    let msg = {
                        type: "text",
                        text: data.del
                    };
                    request(
                        {
                            method: "POST",
                            uri: "https://notify-api.line.me/api/notify",
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            auth: {
                                bearer: "cEpq67bFPhAzhqYvfXDSVisVCTIoiROZS6q9VurykMX" //token
                            },
                            form: {
                                message: `this is eventext=${data.del}` //ข้อความที่จะส่ง
                            }
                        },
                        (err, httpResponse, body) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(body);
                            }
                        }
                    );
                    return client.replyMessage(event.replyToken, msg);
                }
            }
        });



    }


    else if (eventText === 'report') {


        let result = []
        clientDB.query(SDB, (err, resDB) => {


            if (err) throw err;
            for (let row of resDB.rows) {
                result.push(row)
                console.log(JSON.stringify(row));
            }
            data.id = JSON.stringify(result)
            let msg = {
                'type': 'text',
                'text': data.id
            }
            console.log(`this is = ${result}`);
            return client.replyMessage(event.replyToken, msg);
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
                message: `this is eventext=${data.id}`, //ข้อความที่จะส่ง
            },
        }, (err, httpResponse, body) => {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        })



    } else if (eventText === 'ทุนวิจัย') {
        let msg = {
            'type': 'text',
            text: capital.MSG

        }
    } else if (eventText === 'ขอรายละเอียดทุนวิจัย') {
        let msg = {
            'type': 'text',
            text: capital.MSG1

        }
    } else if (eventText === 'ทุนวิจัย2564') {
        let msg = {
            'type': 'text',
            text: capital.MSG2

        }
    } else if (eventText === 'ทุนวิจัย2563') {
        let msg = {
            'type': 'text',
            text: capital.MSG3

        }
    } else if (eventText === 'เบิกเงินวิจัย') {
        let msg = {
            'type': 'text',
            text: withdraw.MSG
        }
    } else if (eventText === 'ขอรายละเอียดเบิกเงินวิจัย') {
        let msg = {
            'type': 'text',
            text: withdraw.MSG1

        }
    } else if (eventText === 'เบิกเงินงวดที่1') {
        let msg = {
            'type': 'text',
            text: withdraw.MSG2

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'เบิกเงินงวดที่2') {
        let msg = {
            'type': 'text',
            text: withdraw.MSG3

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'เบิกเงินงวดที่3') {
        let msg = {
            'type': 'text',
            text: withdraw.MSG4

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'กองทุนสนับสนุนงานวิจัย') {
        let msg = {
            'type': 'text',
            text: fund.MSG

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'คุยกับบอท') {
        let msg = {
            'type': 'text',
            text: 'สวัสดีค่ะท่านสามารถสอบถามเกี่ยวกับ\n-ทุนวิจัย\n-เบิกเงินวิจัย\n-กองทุนสนับสนุนงานวิจัย\n-เอกสารดาวน์โหลด\n' +
                'ท่านสามารถดูรายละเอียดโดยการพิมพ์ขอรายละเอียดแต่ละหัวข้อกับน้องบอทได้ เช่น ทุนวิจัย เป็นต้น'

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'สามารถติดต่อได้ทางไหนบ้าง') {
        let msg = {
            'type': 'text',
            text: 'สวัสดีค่ะท่านสามารถติดต่อ สถาบันวิจัยและพัฒนา มทร.รัตนโกสินทร์ ได้ตามช่องทางการติดต่อด้านล่างนี้\nFacebook : https://www.facebook.com/irdrmutr\nWebsite : https://ird.rmutr.ac.th\nEmail : ird.r@rmutr.ac.th , irdrmutr@hotmail.co.th\nสามารถติดต่อได้ที่ 02-441-6060 ต่อ 2420-2426'

        }
        return client.replyMessage(event.replyToken, msg);
    } else if (eventText === 'เอกสารดาวน์โหลด') {
        let msg = {
            'type': 'text',
            text: 'สวัสดีค่ะท่านสามารถดาวน์โหลดเอกสารต่างๆได้ในลิงค์ด้านล่างนี้\nhttps://ird.rmutr.ac.th/formdownload/ '

        }
        return client.replyMessage(event.replyToken, msg);
    }
    else {

        msg = {
            type: 'text',
            text: 'ขอบคุณที่ใช้บริการตึกบริหารธุรกิจ นะครับ'
        };
        if (eventText !== "hello, world" && eventText !== null) {
            //   clientDB.connect();
            clientDB.query(IDB, [eventText], (err, resDB) => {
                if (err) throw err;
                for (let row of resDB.rows) {
                    console.log(JSON.stringify(row));
                }
                //  clientDB.end();
            });
        }
        
    }
      return client.replyMessage(event.replyToken, msg);

}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
