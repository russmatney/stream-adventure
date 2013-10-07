var crypto = require('crypto');
passphrase = process.argv[2];

var stream = crypto.createDecipher('aes256', passphrase);

process.stdin
  .pipe(stream)
  .pipe(process.stdout);
