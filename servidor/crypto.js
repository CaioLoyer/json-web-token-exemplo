const crypto = require('./crypto');

const encrypted_key = crypto.encrypt("HelloWorld");
console.log(encrypted_key);

const decrypted_key = crypto.decrypt(encrypted_key);
console.log(decrypted_key);

