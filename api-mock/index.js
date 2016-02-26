var http = require('http');

http.createServer(function (req, res) {
  console.log(req.url, req.method);
  if(req.method === 'POST') return handlePost(req, res);
  else mockAPI(req, res);
}).listen(1337);


function handlePost(req, res){
  console.log('handling post');
  console.log(req.headers);
  req.on('data', function(chunk) {
      console.log("Body chunk: ");
      console.log(chunk.toString());
    });

  req.on('end', function() {
    // empty 200 OK response for now
    res.writeHead(200, "OK", {
      'Content-Type': 'text/html'
    });
    res.end();
  });
}

function mockAPI(req, res){
  //imp
}

module.exports = {
  handlePost: handlePost,
  api: mockAPI
};
