var through = require('through');
var trumpet = require('trumpet');
var tr = trumpet();

var loud = tr.select('.loud').createStream();
// unless i'm misreading this, this is a sneaky use of through to convert this stuff bit by bit
loud.pipe(through(function(body) {
  this.queue(body.toString().toUpperCase())
})).pipe(loud);

process.stdin.pipe(tr)
  .pipe(process.stdout);
