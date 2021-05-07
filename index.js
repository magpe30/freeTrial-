const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");
const favicon = require('express-favicon');
const fetch = require('node-fetch');
const short = require('short-uuid');




const app = express();



const urlendodedParser = bodyParser.urlencoded({extended: false});


const viewsDirPath = path.join(__dirname, "templates", "views");

app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", viewsDirPath);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + '/public/images'));
app.use(express.json());


app.get("/freetrial", (req, res) => {
  res.render("index");
});
var globalurl  = "";


app.post("/postApi", async function (req, res) {
  const templateId = req.body.templateID;
  const musicTitle = req.body.musicTitle;
  const cuser  = short.generate();
  const imgArrayFirebase = req.body.imgArrayFirebase;
  const logoArrayFirebase = req.body.logoArrayFirebase;
  const url = `http://appd.visionogy.com/api/v1.0/generate?humancenter=NO&phrases=we,business,classic&buzzwords=we,business,classic&languages=en&images=${imgArrayFirebase}&logo_image=${logoArrayFirebase}&speedadj=1.0&video_ids=${templateId}&objectfag=NO&objectqr=NO&music=${musicTitle}&speechf=&speech&singleflag=NO&vcflag=NO&im_seled=&cuser=${cuser}`
  const options = {
    "method" : "GET",
  };
  console.log(imgArrayFirebase, logoArrayFirebase);
  console.log(url);
  fetch(url, options)
  .then((res) => { 
    status = res.status; 
    return res.json() 
  })
  .then((jsonData) => {
    console.log(jsonData);
    console.log(status);
    let dataUrl = jsonData.English[0].url;
    console.log(dataUrl);
    globalurl = dataUrl;
    console.log(globalurl);
    res.status(200).json({response: "sent"});
  })
  .catch((err) => {
    // handle error
    console.error(err);
  });
 //.then(res => res.json())
 //.then(json => {
 //   console.log(json);
  //  let data = json
  //  console.log(res.status);
  //  res.status(200).json(data);
  //});
});
/*
app.post("/dataApi", async (req, res) => {
  console.log('I got a request');
  const templateId = req.body.templateID;
  const musicTitle = req.body.musicTitle;
  const imgArrayFirebase = req.body.imgArrayFirebase;
  const logoArrayFirebase = req.body.logoArrayFirebase;
  console.log(imgArrayFirebase, logoArrayFirebase); 
  const url = `http://appd.visionogy.com/api/v1.0/generate?humancenter=NO&phrases=we,business,classic&buzzwords=we,business,classic&languages=en&images=&logo_image=${logoArrayFirebase}&speedadj=1.0&video_ids=${templateId}&objectfag=NO&objectqr=NO&music=${musicTitle}&speechf=&speech&singleflag=NO&vcflag=NO&im_seled=photo-1447933601403-0c6688de566e&cuser=aaa`
  const options = {
    "method" : "GET",
  };
  
  const response = await fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
      console.log(response)
    .catch( err => {
      console.log(err);
    })
  
})*/

app.get('/createdtemplate', (req, res) => {
  res.render('createdVideo', {data: globalurl})
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
