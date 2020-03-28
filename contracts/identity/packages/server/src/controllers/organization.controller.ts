
import { Router, Request, Response } from 'express';
import {InitFabricCtrls } from '../convector';
import { Organization,PersonCredentialAttributeValue,Person} from 'did-cc';
import validation from '../helpers/validation';
import {check, validationResult } from 'express-validator';
import * as createError  from 'http-errors';
import authed from '../middlewares/authed';
import {basicCredentialName,basicCredentialAttribute} from '../env';
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })

const router: Router = Router();

router.get('/check_person/:email',authed,async (req, res, next) => {
    const user = req.user;

    if(user.role !== "org" && user.role !== "admin"){
        return next(createError(400,'Invalid permission'));
    }
    
     try {
        let { email } = req.params;
        const ctrls = req.ctrls;

        const personObj = new Person(await ctrls.person.getPerson(email));
       // return res.status(200).json(personObj);
        var hkidno = null;

        for (var i = 0 ; i < personObj.credentials.length; i++){
            const credential = personObj.credentials[i];
            if(credential.credential_id == basicCredentialName){
                for (var j = 0 ; j < credential.attributes.length; j++){
                    const attribute = credential.attributes[j];
                    if(attribute.attribute_id == basicCredentialAttribute){
                        hkidno = attribute.value;
                    }
                }
            }
        }
        

        const person = {
            id:personObj.id,
            email:personObj.email,
            mobile:personObj.mobile,
            created_at:personObj.created_at,
            hkidno
        };

        return res.status(200).json(person);
     } catch (err) {
         console.log(err);
         res.status(500).send(err.responses[0].error);
     }
 });

router.get('/credentials',authed, async (req, res, next) => {
    const user = req.user;

    if(user.role != 'org'){
        next(createError(400,'Invalid permission'));
    }
    const organization_id = user.org_id;
  
    try {
        const ctrls = req.ctrls;
        const result_json = await ctrls.credential.getCredentialsByOrganizationId(organization_id);
        res.send(result_json);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const ctrls = req.ctrls;
        const organizations = await ctrls.organization.index();
        const result_json = [];
        organizations.forEach(element => {
            result_json.push(new Organization(element).toJSON());
        });
        res.status(200).json(result_json);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        const ctrls = req.ctrls;
        const organization = new Organization(await ctrls.organization.show(id));
        res.status(200).json(organization);
    } catch (err) {
        next(createError(404,err.responses[0].error.message));
    }
});
router.post('/',validation.createOrganizationRules, async (req, res, next) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    try {
        const ctrls = req.ctrls;
        const {id,name,logo,person_id} = req.body;
        let organizationObj = new Organization({id,name,logo,person_id});
  
        await ctrls.organization.create(organizationObj);
        const organization = new Organization(await ctrls.organization.show(id));
        res.status(200).json(organization);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});


router.post('/assign_credential',validation.assignCredentialRules, async (req, res, next) => {
    const errors = validationResult(req);

     if (!errors.isEmpty()) {
       return res.status(422).json({ errors: errors.array() });
     }
     try {
         const {email,credential_id,attribute_values} = req.body;
         const ctrls = req.ctrls;
         await ctrls.organization.assign_credential(email,credential_id,attribute_values);

         const person = new Person(await ctrls.person.getPerson(email));
         res.status(200).json(person);
     } catch (err) {
         console.log(err);
         res.status(500).send(err.responses[0].error);
     }
 });


export const OrganizationExpressController: Router = router;