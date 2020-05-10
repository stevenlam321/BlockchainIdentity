const NodeRSA = require('node-rsa');


// var person = {
 
// };
// person.name = "Steven Lam";
// person.age = 18;
// console.log(person);

// function doJob(x,sec) {
//   return new Promise(resolve => {
//   console.log('Start: ' + x);
//     setTimeout(() => {
//         console.log('End: ' + x);
//       resolve(x);
//     }, sec *1000);
//   });
// }
// async function ParallelFlow(){
 
//   let result1 =  doJob(1,1);
//   let result2 =  doJob(2,2);
//   let result3 =  doJob(3,3);
   
//   let r1 = await result1;
//   let r2 = await result2;
//   let r3 = await result3;
   
//   let finalResult =r1+ r2+r3;
   
//   console.log(finalResult);
//   return finalResult;
//   }
   
//   ParallelFlow();
// async function SerialFlow(){
//   for (var i = 0; i < 5;i++){
//     await doJob(i,i);
//   }
//   //let result1 = await doJob(1,1);
//   // let result2 = await doJob(2,2);
//   // let result3 = await doJob(3,3);
   
//   // let finalResult = result1+result2+result3;
//   // console.log(finalResult);
//   //return finalResult;
   
//   }
   
//   SerialFlow();










// const http = require('http');
// var forge = require('node-forge');
// const NodeRSA = require('node-rsa');

// const key = new NodeRSA('-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsksWZ4O2SXXtFWNosaB0PzGKelWzebWnLBQReVXXcw/25DAM4FmN4z91b5EqkujIs4uYmFCDWPKAdHdIK+D0RgDe8vZpTUmO8nysjc8sZ65KFkiw4IJPc7SNYLO8BeCqaHz/j3wxSvDQwi+bBf6jdofkPw8YWukZ2RCKA/dqKhorHSzkKf06Ztk4DFaUV7XaFB7bE2yTiacyPHr1rfVSgCpMfp1OgRV5xzlHJrCuK+QFTt4Udqh/lLpIWQBl0jwkZMITzlCmHllOEhfl7e0GY3poRgymx8RnQXeV6dqrw8O20cVJMcnY7DDI4/d/4qmSdWBbFjNyHkN3c4Q58qXbtwIDAQAB-----END PUBLIC KEY-----');
// //  console.log(key);
// const text = 'Hello RSA!';
// const encrypted = key.encrypt(text, 'base64');
// console.log('encrypted: ', encrypted);

const privateKey = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----MIIEogIBAAKCAQEAsksWZ4O2SXXtFWNosaB0PzGKelWzebWnLBQReVXXcw/25DAM4FmN4z91b5EqkujIs4uYmFCDWPKAdHdIK+D0RgDe8vZpTUmO8nysjc8sZ65KFkiw4IJPc7SNYLO8BeCqaHz/j3wxSvDQwi+bBf6jdofkPw8YWukZ2RCKA/dqKhorHSzkKf06Ztk4DFaUV7XaFB7bE2yTiacyPHr1rfVSgCpMfp1OgRV5xzlHJrCuK+QFTt4Udqh/lLpIWQBl0jwkZMITzlCmHllOEhfl7e0GY3poRgymx8RnQXeV6dqrw8O20cVJMcnY7DDI4/d/4qmSdWBbFjNyHkN3c4Q58qXbtwIDAQABAoIBAFJzPOoj09GG8luYvBqgjAGJRHOsXDIlmihdI3OMCfVQ5ajCu8GoSGBVwVYVuK11bxLwtGGDoiopAtRZMQvxnKUe0/thjnLKWIu0sgtmSi+sPuCtPvaj7GAil9qnY4UIT2XAoGJXWWhBkxip8TPFfQxcbWXn8ihgca6a4mhRK0xKRhrzNXUc07QSZJaF0r4yBw/2V4yruHgdPTMcNaqk/9wFTfnl1vMHpK8lmYMlRXiAB7sMh5sA1lvmN8TNNXmsisY86Rf75HPKk0DEFsaRcqihhGnEtNLoIcJK564xP42rbVObfbW1URika6Yq4owMv5Mfl/FvM1KjYa+Jh271j/kCgYEA1e1HqswXSsFIZdb+T5eai8eJwF4uuINkqOYhYRlNC1bvOeFEvbB2uXeg9C0AjE2wbU8s9hS5rginsZnK2CWov3qV0aFByUnUTprn6To7TKV9jP0a9v35P/rGni5EY/os/tCrmOaZz1l+Pa6rkUdTi/ZBaWY0whfKB9IL1vTyokUCgYEA1Vu9lnuNhieDDA/WTWqxkMJnnQ1IBBg6mika2wvAvo7HJcdnk70YJwKQvd94fvASKLOtE1aEc8N2ZEbMhbwrJ97zGqDoRgWhKNO+4O5y7e9Q63EBtsBzoSlGCejfFhqAb5a665bWegS3uktucKWyqD0ftlKN2yXmOIpxNQKs48sCgYBbmbRcP/OhQM3dPYe7UPEN9SzYv/tFao2JfLDCQPEqb9kTcY/boVnU5JJ4u2RGr2ViCMr5u7od+PrFI1Ml5koxYy4Pivr+U6yi09WFmjeWBC6UVjRbmjhF2v188da68H6fxX4UhHlLvcg+ZTJ1jJMLlTBBD1B742/QlXIYYt4Z+QKBgDe8H2qQHAhPigw8lt7iYEBQiICeV5G6QpTC6CEQkOk2ow9bZ9NQMl7+bJEtL2z5icTYKv5CO5eCGAtZ81N8NEnWE+uA3SxtjAv+RH69y4gcXCck/i2fWJVhEsrD6oL7qVF9LpcccCqv0M75pYAHyQPp877NEgGNhPaAM9KFQGTBAoGAbR4sowWBmMhqQsLd0DFKFkAZlbHY+SRLkTAskWg2jg9OxBTodmJ8f/uC0Rgj8LgeJZRELzEyLlb6SWoDyiBeaSlbjd524abeymq78KnzUkMbHxzJIbimKDEQeXpweFizxw/5XPrO5dapPx/Cqs8mBooaO3TxbIpWUjEXAymPjys=-----END RSA PRIVATE KEY-----');
var encryptedData = 'l+UL0hMDWn7CK6z7zn4Ggf3CUnNQuUg3Hkz4GLWI8S+nLzFV3LXa4ohvYWcaxaoO8R8Nh5tfFn4poy0OOTA3pjxmJR438p5lez/GNP0WD5nyRIwBQaCVMJetQgVrCby5bksGMY4YnP56GWEq86cNBHF+SW3315WDVbYxzTpgWb2jKB10lttbL2s3d6mbXoveEkGdPd0iDO46MiQ23eRRnofrkZn0g7sesU1l/AFGsWNV0+GSocnviZqX4aPkC/QGi7vEHvsGJmT289RgRObtrSC4RCmzFxW62muQfla/dJ8WQqR+tPnPYITh7WbfRvLdWdqTf3aC8ZG/IAET5WUnUqsLmpTE1C9CGD8xVQBbc2I+HBxmIbVojXu0fC4LXx45srwc2uJoVMu0+0E6mON5d0Df7PtU0rho/H+F4NyjIgb8DdPc/5Ov/weArrg3/bGfzfs7RBNxYUuf5+NhfS3q9IEJfhdB8nxjkijr6hgoG/KVFqZxiLe9wayJYnymKypQnR0Z6daWvphYiZSw8xCq835MnhLjX+KB/zMhTqVcDPTCsXXupLfYhA9k0bGKuEFRYRQbfEDFS8pyOQPrjct12Ul4ucPuScYcRO067rchXTdwHLnCmO1QoQRZittP5N//FGtRafbTlfAoeT+XB7smfFRD9ZqW9VnT09fE7lhhOnI=';
const decrypted = privateKey.decrypt(encryptedData, 'utf8');
console.log('decrypted: ', decrypted);




// const hostname = '127.0.0.1';
// const port = 9999;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });