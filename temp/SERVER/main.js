const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 8000

app.get('/tts', (req, res) => {

    console.log("웹 -> 서버로 전달 : ", req.query.word);
    param = req.query.word;
    const result = spawn('python', ['./tts.py', param]);

    result.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');

    });

    result.stderr.on("data", function (data) {
        console.log("Fail", data.toString());
    });
 
})

app.listen(port, () => console.log(`Example app listening on port 
${port}!`))