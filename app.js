const mongoose = require("mongoose");
require("dotenv").config();
const nodemailer = require("nodemailer");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoute = require("./route");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/corona", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB IS CONNECTED");
  });
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", userRoute);

app.post("/api/mail", (req, res) => {

  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
      <h3>Details Corona Update</h3>
      <ul>
        <li>Email: ${req.body.email}</li>
        <li>For Country: ${req.body.country}</li>
        <li>Confirmed: ${req.body.data.confirmed.value}</li>
        <li>Recovered: ${req.body.data.recovered.value}</li>
        <li>Deaths: ${req.body.data.deaths.value}</li>
        <li>Last Update: ${req.body.data.lastUpdate}</li>
      </ul>
      <br>
      <br>
      <h1>THANK YOU! STAY HOME. STAY SAFE</h1>`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: "venivisa62@gmail.com",
      to: `${req.body.email}`,

      subject: "New Message",
      text: "Thanks",
      html: htmlEmail,

    }
    setTimeout(()=>{transporter.sendMail(mailOptions, (err, info)=>{
      if(err){
        console.log(err)
      }else{
        console.log("Message sent");

      }
    })}, 30000)
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`The app is running at ${port}`);
});
