"use strict";
// class Person{
//     constructor(data){
//       //  this.fuck = null;
//         Object.assign(this,data);
//         console.log(data);
//     }
//     fuck(name1,name2=null){
//         return name1 + name2;
//     }
//     set username(username){
//         this._username = username;
//     }
//     get username(){
//         return this._username;
//     }
// }
const CommercialPaper = require('./paper.js');
// // const cp = new CommercialPaper();
// const issuer = "Org1";
// const paperNumber = "P0001";
// const issueDateTime = "2019-10-10";
// const maturityDateTime = "2019-10-10 10:00:01";
// const faceValue = 50000;
// const cp = CommercialPaper.createInstance(issuer, paperNumber, issueDateTime, maturityDateTime, faceValue);
// // console.log(cp);
// // cp.setOwner("Mary");
// // console.log(cp.getOwner());
// const buf = cp.toBuffer();
// const cpObject = JSON.parse(buf);
// const cpCastObject = CommercialPaper.fromBuffer(buf);
// console.log(cpObject);
// console.log(cpCastObject.getIssuer());

class Person{
    constructor(obj){
       Object.assign(this,obj);
    }
}
const s = {"username":"StevenLam","age":18};
function generator(ObjectClass,data){
    return new ObjectClass(data);
}
// const p = new (Person)(s);
const p = generator(Person,s);
console.log(p);