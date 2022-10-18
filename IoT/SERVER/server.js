const express = require("express");
const app = express();
const path = require("path");

const spawn = require("child_process").spawn;

// 나중에 cors 라이브러리 임폴트 해야함
app.use(express.json());
var cors = require("cors");
// const { Server } = require('http')
app.use(cors());

app.listen(8000, function () {
  console.log("listening on 8000");
});

// app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname, '../test/build/index.html'))
// })

// API 통신
app.get("/product", function (req, res) {
  res.json({ name: "black shoes" });
});

app.get("/arduino", function (req, res) {
  const result = spawn("python", ["./arduino/초음파센서/goweb.py"]);
  console.log("im arduino");
  result.stdout.on("data", function (data) {
    console.log("im going");
    res.json({ id: data.toString() });
  });
  result.stderr.on("data", function (data) {
    console.log("Fail", data.toString());
  });
});

app.get("/login", (req, res) => {
  const result = spawn("python", ["./python/face_recognition/face_recog.py"]);
  console.log("im here");
  result.stdout.on("data", function (data) {
    console.log(data.toString());
    res.json({ id: data.toString() });
  });
});

// /camera?id=아이번호&email=부모이메일
app.get("/camera", (req, res) => {
  param1 = req.query.id;
  console.log("아이 번호 : ", param1);

  param2 = req.query.email;
  console.log("부모 이메일 : ", param2);

  const result = spawn("python", [
    "./python/BackgroundFilter/main.py",
    param1,
    param2,
  ]);
  result.stdout.on("data", function (data) {
    console.log(data.toString());
    res.json({ id: data.toString() });
  });

  result.stderr.on("data", function (data) {
    console.log("Fail", data.toString());
  });
});

app.get("/tts", (req, res) => {
  console.log("웹 -> 서버로 전달 : ", req.query.word);
  param = req.query.word;
  const result = spawn("python", ["./python/tts.py", param]);

  result.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    res.json({ key: data });
  });

  result.stderr.on("data", function (data) {
    console.log("Fail", data.toString());
  });
});

app.get("/stt", (req, res) => {
  console.log("녹음 및 STT 변환");
  const result = spawn("python", ["./python/STT/record.py"]);

  result.stdout.on("data", function (data) {
    let result = data.toString().replace(`b\'`, "").replace(`\'`, "");
    let buff = Buffer.from(result, "base64");
    let text = buff.toString("utf-8");
    console.log("변환 후 text : ", text);

    res.json({ result: text });
  });

  result.stderr.on("data", function (data) {
    console.log("Fail", data.toString());
  });
});
// 항상 가장 하단에 있는 코드
// app.get('*', function(req, res){
//   res.sendFile(path.join(__dirname, '../test/build/index.html'))
// })

// build 는 굳이 할 필요 x
