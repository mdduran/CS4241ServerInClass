var http = require('http')
  //, express = require("express")
  , qs   = require('querystring')
  , fs   = require('fs')
  , url  = require('url')
 // , bodyParser = require("body-parser")
  , port = 8080
  , targetMovie = ''
 // ,app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

var csv = fs.createReadStream('drones.csv');

var data = '';
csv.on('data', function(d){
  data += d;
})

var droneArray = [];

csv.on('end', function(){
  var rows = data.split('\n');
  for(var i=0; i<rows.length; i++){
    var entries = rows[i].split(',');
    droneArray.push(entries);
  }
  csv.close();
})



function processPost(req,res,callback){
  var postBody = '';

  if(req.method == 'POST'){
    req.on('data', function (data) {
      postBody += data;
      if (postBody.length > 1e5) { 
          request.connection.destroy();
      }
    });

     req.on('end', function() {
            req.post = qs.parse(postBody);
            callback();
      });
  }
}

var server = http.createServer(function (req, res) {

   
  //parse http
  var uri = url.parse(req.url)
  var queryData = url.parse(req.url, true).query
  
  



  // Note we no longer have an index.html file, but we handle the cases since that's what the browser will request
  // You'll need to modify the below to account for POSTs
  switch( uri.pathname ) {
    case '/':
      if(req.method == 'GET') { // Search
        handleSearch(res, uri, queryData)
        
      } else if(req.method == 'POST') { // POST
       
        processPost(req,res,function(){
          
          //process post here

        handleSearch(res, uri, '')

        });

        
      } else {
        sendIndex(res)
      }
      break
    case '/index.html':
      if(req.method == 'GET') { // Search
        handleSearch(res, uri, queryData)
        
      } else if(req.method == 'POST') { // POST
       
        processPost(req,res,function(){
          
          //process post here

        handleSearch(res, uri, '')

        });

        
      } else {
        sendIndex(res)
      }
      break
    case '/style.css':
      sendFile(res, 'style.css', 'text/css')
      break
    case '/js/scripts.js':
      sendFile(res, 'scripts.js', 'text/javascript')
      break
    default:
      res.end('404 not found')
  }

})

server.listen(process.env.PORT || port)
console.log('listening on 8080')

// You'll be modifying this function for the search / query part
function handleSearch(res, uri, queryData) {
  var contentType = 'text/html'
  res.writeHead(200, {'Content-type': contentType})
  // PROCESS THE URI TO FILTER MOVIES ARRAY BASED ON THE USER INPUT
  // somehow filter movies

  if(queryData.movieSearch){
    targetMovie = queryData.movieSearch;
  }else{
    targetMovie = '';
  }
  sendIndex(res)
}

// `handlePost` and is just one possible way of adding add/delete functionality.
// start with it, or come up with another solution...
function handlePost(res, req, uri) {
}

// Note: consider this your "index.html" for this assignment
// You'll be modifying this function
function sendIndex(res) {
  var contentType = 'text/html'
    , html = ''
  
  res.writeHead(200, {'Content-type': contentType})
  res.end(html, 'utf-8')
}

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}