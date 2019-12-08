var forge = require('node-forge');
var http = require('http');
var fs = require("fs");

var data = "New File Contents";



//create a server object:
// http.createServer(function (req, res) {

//     res.write('Hello World!'); //write a response to the client
//     res.end(); //end the response
//   }).listen(8080); //the server object listens on port 8080

// var rsa = forge.pki.rsa;
// var md = forge.md.md5.create();
// md.update('The quick brown fox jumps over the lazy dog');
// console.log(md.digest().toHex());



var content = fs.readFileSync("id_rsa.pub", "utf-8");
var publicKey = forge.pki.publicKeyFromPem(content);
content = fs.readFileSync("id_rsa", "utf-8");
var privateKey = forge.pki.privateKeyFromPem(content);
content = fs.readFileSync("signature", "utf-8");
var signature = Buffer.from(content,'hex');
console.log(signature);

var md = forge.md.sha1.create();
md.update('sign this', 'utf8');
// var signature = privateKey.sign(md);
// console.log(md);
// console.log(signature);

// var verified = keypair.publicKey.verify(md.digest().bytes(), signature);
// console.log(verified);

var verified = publicKey.verify(md.digest().bytes(), signature);
console.log(verified);


// var message = 'Hello fuck';
// var encrypted = publicKey.encrypt(message);
//  console.log(encrypted);
// // decrypt data with a private key (defaults to RSAES PKCS#1 v1.5)
// var decrypted = privateKey.decrypt(encrypted);
// console.log(decrypted);


// var md = forge.md.sha1.create();
// md.update('sign this', 'utf8');
// var signature = privateKey.sign(md);
// const signature_str = Buffer.from(forge.util.binary.raw.decode(signature)).toString('hex');
// fs.writeFile("signature", signature_str, (err) => {
//     if (err) console.log(err);
//     console.log("Successfully Written to File.");
// });


//  const r2 = forge.util.binary.raw.decode(signature);
//  console.log(r2);
// verify data with a public key
// (defaults to RSASSA PKCS#1 v1.5)
// var verified = publicKey.verify(md.digest().bytes(), signature);
// console.log(verified);

// console.log(publicKey,privateKey);
// var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
// var publicKey = keypair.publicKey;
// var privateKey = keypair.privateKey;
// var pu_str = forge.pki.publicKeyToPem(publicKey);
// var pr_str = forge.pki.privateKeyToPem(privateKey);
// console.log(pu_str);
// fs.writeFile("id_rsa.pub", pu_str, (err) => {
//     if (err) console.log(err);
//     console.log("Successfully Written to File.");
// });
// fs.writeFile("id_rsa", pr_str, (err) => {
//     if (err) console.log(err);
//     console.log("Successfully Written to File.");
// });
// fs.readFile("not-found.txt", "utf-8", (err, data) => {
//     if (err) { console.log(err) }
//     console.log(data);
// })



// var bytes = 'Hello world';

// var encrypted = keypair.publicKey.encrypt(bytes);
//  console.log(encrypted);
// // decrypt data with a private key (defaults to RSAES PKCS#1 v1.5)
// var decrypted = keypair.privateKey.decrypt(encrypted);
// console.log(decrypted);
// var md = forge.md.sha1.create();
// md.update('sign this', 'utf8');
// var signature = keypair.privateKey.sign(md);
// console.log(md);
// console.log(signature);

// var verified = keypair.publicKey.verify(md.digest().bytes(), signature);
// console.log(verified);
// var ed25519 = forge.pki.ed25519;
// var keypair = ed25519.generateKeyPair();
// // console.log(keypair.publicKey.toString());
// var signature = ed25519.sign({
//     message: 'test',
//     // also accepts `binary` if you want to pass a binary string
//     encoding: 'utf8',
//     // node.js Buffer, Uint8Array, forge ByteBuffer, binary string
//     privateKey: keypair.privateKey
//   });

//   var verified = ed25519.verify({
//     message: 'test',
//     encoding: 'utf8',
//     // node.js Buffer, Uint8Array, forge ByteBuffer, or binary string
//     signature: signature,
//     // node.js Buffer, Uint8Array, forge ByteBuffer, or binary string
//     publicKey: keypair.publicKey
//   });


// console.log(keypair);

// console.log(signature);
// console.log(verified);