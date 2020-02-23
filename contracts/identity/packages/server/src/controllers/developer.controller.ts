
import { Router, Request, Response } from 'express';
import {PersonControllerBackEnd } from '../convector';
import { Person,Attribute } from 'did-cc';
import validation from '../helpers/validation';
import * as createError  from 'http-errors';
import {check, validationResult } from 'express-validator';
import User from '../models/user';
import * as bcrypt from 'bcryptjs';
import  * as jwt from 'jsonwebtoken';
import {secretKey} from '../env';
import * as Client from 'fabric-client';
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })


const router: Router = Router();
router.get('/',  async (req, res, next) => {
    res.send('hello developer');
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token,secretKey);
      
     res.status(200).json(payload);
 });

// router.get('/test', async (req, res, next) => {
//     // Get the direct native `sdk` from Fabric
//     const client = ((PersonControllerBackEnd)
//     .adapter['client'] as Client);

//     // Name of the new user
//     const enrollmentID = 'newUserTest4';

//     // // Admin with permissions to create an user in the CA
//     const adminUsername = 'admin';
//     const mspid = 'org1MSP';

//     const admin = await client.getUserContext(adminUsername, true);

//     if (!admin || !admin.isEnrolled()) {
//     throw new Error(`Admin ${adminUsername} user is not enrolled ` +
//         `when trying to register user ${enrollmentID}`);
//     }

//     const ca = client.getCertificateAuthority();

//     const enrollmentSecret = await ca.register({enrollmentID,affiliation: 'org1'}, admin);

//     const { key, certificate } = await ca.enroll({enrollmentSecret,enrollmentID: enrollmentID});

//     let result = await client.createUser({
//     mspid,
//     skipPersistence: false,
//     username: enrollmentID,
//     cryptoContent: {
//         privateKeyPEM: key.toBytes(),
//         signedCertPEM: certificate
//     }
//     });
//    res.send('fuck');
//  });

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
        const client = ((PersonControllerBackEnd)
        .adapter['client'] as Client);
        
        const id = "P-"+ Math.random().toString(36).substr(2,10);
        // Name of the new user
        const enrollmentID = id;
    
        // Admin with permissions to create an user in the CA
        const adminUsername = 'admin';
        const mspid = 'org1MSP';
    
        const admin = await client.getUserContext(adminUsername, true);
    
        if (!admin || !admin.isEnrolled()) {
            next(createError(500,`Admin ${adminUsername} user is not enrolled ` +
            `when trying to register new user`));
        }
    
        const ca = client.getCertificateAuthority();
    
        const enrollmentSecret = await ca.register({enrollmentID,affiliation: 'org1'}, admin);
    
        const { key, certificate } = await ca.enroll({enrollmentSecret,enrollmentID: enrollmentID});
    
        let result = await client.createUser({
            mspid,
            skipPersistence: false,
            username: enrollmentID,
            cryptoContent: {
                privateKeyPEM: key.toBytes(),
                signedCertPEM: certificate
            }
        });

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
    const token = jwt.sign({ email: user.email,identityID:person.id}, secretKey);
    // res.status(200).json(person);
    res.status(200).json(token);
});

router.get('/protected',  async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token,secretKey);
      
     res.status(200).json(payload);
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

export const DeveloperExpressController: Router = router;