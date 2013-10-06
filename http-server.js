var http = require('http');
var through = require('through');

function write (data) {
  this.queue(data.toString().toUpperCase());
}
function end () { this.queue(null) }

var server = http.createServer(function (req, res) {
  if (req.method == 'POST')
    req.pipe(through(write, end)).pipe(res);
  else res.end('no esta post');
});
server.listen(8001);
