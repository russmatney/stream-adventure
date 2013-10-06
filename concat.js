var concat = require('concat-stream');

process.stdin.pipe(concat(function(body) {
  body = body.toString().split('').reverse().join('');
  console.log(body);
}));
