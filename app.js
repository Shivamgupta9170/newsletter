const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
// const { allowedNodeEnvironmentFlags } = require("process");
// const { request } = require("http");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html"); 
})

app.post("/",function(req,res){
    const FirstName = req.body.firstName
    const LastName = req.body.lastName
    const Email = req.body.email

    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields:{
                    FNAME: FirstName,
                    LNAME: LastName
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/cdf06fedba"

    const options = {
        method: "POST",
        auth: "shivam1:2ed676bf9f74341c7a791a4227246535-us14"
    }

    const request = https.request(url, options, function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });

    })
    request.write(jsonData);
    request.end();
    

    console.log(FirstName , LastName ,Email);
})


// API-KEY: 2ed676bf9f74341c7a791a4227246535-us14

// list_id: cdf06fedba

app.listen(3000,function(){
    console.log("server is rumming on 3000");

})

