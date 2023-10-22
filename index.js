const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require('cors')
const port = 8080;


const con = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  port: 3306,
  database: "sql12655344",
  user: "sql12655344",
  password: "j9LHxMtR7j",
});
con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to SQL!");
  }
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
});
app.get("/seats", async (req, res) => {
  con.query("select * from seats",(err,data)=>{
    if(err) throw err;
    res.status(200).send(JSON.stringify(data));
  })
});

app.post("/book", async (req, res) => {
  const {seatNum} = req.body
  const sqlQuery = "update seats set isBooked = 1 where seatNum = ?";
  const values = [seatNum];
  con.query(sqlQuery,values,(err,data)=>{
    if(err) throw err;
    res.status(200).send(`${seatNum} booked`);
  })
});

app.post('/cancel',async(req,res)=>{
  const {seatNum} = req.body;
  const sqlQuery = "update seats set isBooked = 0 where seatNum = ?";
  const values = [seatNum];
  con.query(sqlQuery,values,(err,data)=>{
    if(err) throw err;
    res.status(200).send(`${seatNum} cancelled`);
  })
})

app.listen(port, () => {
  console.log("Sever is up and running on port : ", port);
});
