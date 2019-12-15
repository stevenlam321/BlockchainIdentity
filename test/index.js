"use strict";
// class Person {
//     constructor() {
//       this.id = 'id_1';
//     }

//     set name(name) {
//         this._name = name.charAt(0).toUpperCase() + name.slice(1);
//     }
//     get name() {
//         return this._name;
//     }
//     sayHello() {
//       console.log('Hello, my name is ' + this.name + ', I have ID: ' + this.id);
//     }
//   }
  
// var justAGuy = new Person();
// justAGuy.name = 'martin'; // The setter will be used automatically here.
// justAGuy.sayHello(); // Will output 'Hello, my name is Martin, I have ID: id_1'

class Person{
    constructor(data){
      //  this.fuck = null;
        Object.assign(this,data);
        console.log(data);
    }
    fuck(name1,name2=null){
        return name1 + name2;
    }
    set username(username){
        this._username = username;
    }
    get username(){
        return this._username;
    }
    // set fuck(fuck){
    //     // console.log(fuck);
    //     this._fuck = fuck;
    // }
    // get fuck(){
    //     // console.log(this._fuck);
    //     return this._fuck;
    // }
}

var p = new Person({username:"Steven",cert:null});
p.age = 90;
const d = JSON.stringify(p);
console.log(d);
// var crypto = require("crypto");
// var id = crypto.randomBytes(5).toString('hex');
// console.log(id);
// var username = "Steven";
// var age = 18;
// //Object.assign(this, obj);
// var obj= {username,age};
// console.log(obj);