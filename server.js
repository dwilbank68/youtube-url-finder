const port = process.env.PORT || 3000;

const path = require("path");
const express = require("express");

var app = express();
var bodyParser = require('body-parser');
var YTSearch = require('youtube-api-search');
// const hbs = require("hbs");
// hbs.registerPartials(__dirname + '/views/partials');
// app.set('view engine', 'hbs');

// app.use((req, res, next)=> {
//     res.render('maintenance.hbs');
// })

app.use(bodyParser.json());

const publicPath = path.join(__dirname, './public')
app.use(express.static(publicPath));

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

// const fs = require("fs");
// app.use((req, res, next)=> {
//     var now = new Date().toString();
//     var log = `${now}: ${req.method} ${req.url}`;
//     console.log(log);
//     fs.appendFile('server.log', log +'\n');
//     next();
// })
//
//
// hbs.registerHelper('getCurrentYear', ()=>{
//     return new Date().getFullYear();
// });
//
// hbs.registerHelper('upperCase', (text)=>{
//     return text.toUpperCase();
// });

// app.get('/',(req,res)=>{
//     res.sendFile('./public/index.html');
// })
//
app.post('/titles', (req, res)=> {
    // var titlesArr = JSON.parse(req.body);
    var urlsArr = [];
    // console.log('got data', req.body);

    var titlesArr = Object
                .keys(req.body)
                .map((key) => {
                    return req.body[key];
                });

    for(var i = 0; i < titlesArr.length; i++){
        // console.log('TITLE IS', titlesArr[i]);
        var searchObj = {
            key: process.env.API_KEY,
            term: titlesArr[i]
        }
        YTSearch(searchObj, function(data){
            if (data[0]) {
                // console.log('URL IS', data[0].id.videoId);
                urlsArr.push({
                    url: `https://www.youtube.com/watch?v=${data[0].id.videoId}`
                })

                if (urlsArr.length === titlesArr.length) {
                    console.log(urlsArr);
                    res.json(urlsArr);
                }
            } else {
                urlsArr.push({
                    url: 'COULD NOT FIND ' +searchObj.term
                })
                if (urlsArr.length === titlesArr.length) {
                    console.log(urlsArr);
                    res.json(urlsArr);
                }
            }
        })
    }

    console.log('urlsArr', urlsArr);

    // res.render('about.hbs', {
    //     pageTitle: 'asdfsd'
    // })

    // $scope.count = vm.titlesArr.length;

})

app.listen(port, () => {
    console.log('running on port ' + port);
})