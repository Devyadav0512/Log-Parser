const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
        var result = []

        ans = req.body.logs.toString();
        ans = ans.replace(/(\r\n|\n|\r)/gm, "")

        var arr = ans.split(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+\dZ\s)/);
        arr = arr.filter(e =>  e);
        
        for(var i = 1; i<arr.length; i+=2){
            if(arr[i].split(" ")[1] == "error"){
                var hello = JSON.parse(arr[i].split(" -")[1])
                var temp = { timestamp : Date.now(), loglevel : arr[i].split(" ")[1], transactionId : hello.transactionId, err : hello.err }
                result.push(temp)
            }
        }
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    });

app.listen(port, () => console.log(`Log Parser Backend listening on port ${port}!`));