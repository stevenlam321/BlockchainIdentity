
import { Router, Request, Response } from 'express';
import {PersonControllerBackEnd, InitServerIdentity } from '../convector';
import { Person,Attribute } from 'did-cc';
import validation from '../helpers/validation';
import * as createError  from 'http-errors';
import {check, validationResult } from 'express-validator';
import User from '../models/user';
import * as bcrypt from 'bcryptjs';

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })


const router: Router = Router();

router.post('/register',validation.registerRules,  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }

    const {email,mobile,password} = req.body;

    var user = await User.findOne({email});
    if(user){
        return next(createError(400,'Email already registered'));
    }
    const hashed_password = bcrypt.hashSync(password, 10);
   
     try {
        const id = "P-"+ Math.random().toString(36).substr(2,10);
        const {email,mobile} = req.body;
        const personObj = new Person({id,email,mobile});
        await PersonControllerBackEnd.create(personObj);
        const person = new Person(await PersonControllerBackEnd.show(id));
        user = await User.create({email,password:hashed_password});
         res.status(200).json(person);
     } catch (err) {
        next(createError(400,err.responses[0].error.message));
     }
 });

router.post('/login',validation.loginRules,  async (req, res, next) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    var user = await User.findOne({email});

    if(!user || (user && !user.verifyPassword(password))){
        return next(createError(400,'Invalid email or password'));
    }
    const personObj = await PersonControllerBackEnd.getPerson(email) as Person;
    const person = new Person(personObj);
    res.status(200).json(person);
});


router.get('/:text',  async (req, res, next) => {
    try {
        let { text } = req.params;
        var person = null;
        if(text.indexOf('@') != -1){
            person = await PersonControllerBackEnd.getPerson(text);
        }else{
            person = await PersonControllerBackEnd.show(text);
        }
        person = new Person(person);
        res.send(person);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});

export const PersonExpressController: Router = router;