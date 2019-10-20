const { Client } = require('pg');

const client = new Client({
  connectionString:'postgres://elvipdiufbxybl:68b44a5fd98030da2cb8e10f996cd150bb98a1fed78e8722c244e652dcf42501@ec2-107-21-200-103.compute-1.amazonaws.com:5432/ddlvb2mksef9ll',
  ssl: true,
});


const  CTB = 'CREATE TABLE question(id SERIAL PRIMARY KEY,question VARCHAR NOT NULL);'
 const IDB = "INSERT INTO question (name) VALUES ($1)"
let DRB = 'DROP TABLE  question'
// client.query(CTB,(err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });
//  เปิดโค้ตตรงนี้เพื่อสร้าง database

// let createData=()=>{
//     client.connect();
//     client.query(CTB,(err, res) => {
//         if (err) throw err;
//         for (let row of res.rows) {
//           console.log(JSON.stringify(row));
//         }
//         client.end();
//       });
// }

// let addData=(params)=>{
//     client.connect();
//     client.query(IDB,[params],(err, res) => {
//         if (err) throw err;
//         for (let row of res.rows) {
//           console.log(JSON.stringify(row));
//         }
//         client.end();
//       });
// }
// let  getData=()=>{
//     client.connect();
//     let result = []
//      client.query(SDB,(err, res) => {
//         result.push(res.rows)
//         if (err) throw err;
//         for (let row of res.rows) {
            
//           console.log(JSON.stringify(row));
//         }
       
//         console.log(this is = ${result});
//       });
//       client.end();
    
     
//       return result
    
      
// }
// createData()
module.exports= {
    clientDB:client
}