var through = require('through')
var split   = require('split')

var even = true;
process.stdin
  .pipe(split())
  .pipe(through(function (line) {
    if(even)
      this.queue(line.toString().toLowerCase());
    else
      this.queue(line.toString().toUpperCase());
    even = !even;
    this.queue('\n');
  }))
  .pipe(process.stdout);


