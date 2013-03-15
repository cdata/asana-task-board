var express = require('express');
var app = express();
var query = require('querystring');
var https = require('https');
var url = require('url');
var asanaApi = 'https://app.asana.com/api/1.0/';
var asanaMatch = /\/asana\//;

app.use(express.static('./static'));
app.get(/^\/asana\/([^\/]*)\/(.*)$/, function(request, response) {
  var apiKey = request.params[0];
  var apiPath = request.params[1];
  var fullApiUrl = url.parse(asanaApi + apiPath);

  fullApiUrl.auth = apiKey + ':';
  fullApiUrl.path += '?' + query.stringify(request.query);

  var apiRequest = https.get(fullApiUrl, function(asanaResponse) {
    asanaResponse.pipe(response);
  }).on('error', function(error) {
    response.end(error.toString());
  });
});

app.listen(11000);
