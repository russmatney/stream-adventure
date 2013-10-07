//requires
var crypto = require('crypto');
var fs = require('fs');
var tar = require('tar');
var zlib = require('zlib');
var through = require('through');

// inputs
var name = process.argv[2];
var passphrase = process.argv[3];

//streams
var decryptStream = crypto.createDecipher(name, passphrase);
var unzipStream = zlib.createGunzip();

// parser
var parser = tar.Parse();
parser.on('entry', function(file){
  if(file.type !== 'File') return;

  var hashStream = crypto.createHash('md5', {encoding: 'hex'});

  file
    .pipe(hashStream)
    .pipe(through(null, function() {this.queue(' ' + file.path + '\n')}))
    .pipe(process.stdout);
});

// the work
process.stdin
  .pipe(decryptStream)
  .pipe(unzipStream)
  .pipe(parser);

