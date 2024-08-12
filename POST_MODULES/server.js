const express = require('express');
const app = express();

var bodyParse = require('body-parser');
const bodyParser = require('body-parser');

var urlencodedParser=bodyParser.urlencoded({extended:false})

app.get('/', function(req,res){
    res.sendFile(__dirname + '/'+'index.html');
})

app.post('/process_post',urlencodedParser,function (req,res){
response = {
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    age:req.body.age,
    course:req.body.course,
    language_1:req.body.language_1,
    language_2:req.body.language_2,
    language_3:req.body.language_3,
    year_level:req.body.year_level
};
    console.log(response);
    res.end(JSON.stringify(response));
});

app.listen(3000,() =>{
    console.log('Server is running on http://localhost:3000');
});
