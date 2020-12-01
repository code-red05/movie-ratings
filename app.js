const express = require('express');
const request = require('request');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public/images'))

app.get('/', function(req, res){
    res.render('search');
});

app.get('/results', function(req, res){
   /* var query = req.query.search;
    var url = 'https://www.omdbapi.com/?s=' + query + '&apikey=3047954a' + '&page=';
    var i = 0;
    var temp = [];
    var data = [];
    var gotResponse = 'True';
    for(i=1; i<=1; i++){
        request(url+toString(i), function(error, response, body){
            if(!error && response.statusCode == 200){
                temp = JSON.parse(body);
                if(temp['Response'] == 'True'){
                    data = data.concat(temp['Search']);
                }
                else{
                    gotResponse = 'False';
                }
                console.log(i);
                if(i==1){
                    console.log(gotResponse);
                    res.render('results', {data: data, query: query, gotResponse: gotResponse});
                }
            }
            else{
                res.render('error');
            }
        });
    }*/
    var query = req.query.search;
    var url = 'https://www.omdbapi.com/?s=' + query + '&apikey=3047954a' + '&page=';
    var movies = [];
    request(url+'1', function(error1, response1, body1){
        if(!error1 && response1.statusCode == 200){
            var data1 = JSON.parse(body1);
            if(data1['Response'] == 'True'){
                movies = movies.concat(data1['Search']);
                request(url+'2', function(error2, response2, body2){
                    if(!error2 && response2.statusCode == 200){
                        var data2 = JSON.parse(body2);
                        if(data2['Response'] == 'True'){
                            movies = movies.concat(data2['Search']);
                            request(url+'3', function(error3, response3, body3){
                                if(!error3 && response3.statusCode == 200){
                                    var data3 = JSON.parse(body3);
                                    if(data3['Response'] == 'True'){
                                        movies = movies.concat(data3['Search']);
                                        res.render('results', {data: movies, query: query, gotResponse: 'True'});
                                    }
                                }
                            });
                        }
                        else{
                            res.render('results', {data: movies, query: query, gotResponse: 'True'})
                        }
                    }
                });
            }
            else{
                res.render('results', {data: [], query: query, gotResponse: 'False'});
            }
        }
    });
});

 app.listen(3000, function(){
     console.log('Movie app started on port: 3000');
 });
