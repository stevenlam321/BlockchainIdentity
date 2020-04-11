
import { Router, Request, Response } from 'express';
import {Init } from '../convector';
import { Organization,PersonCredentialAttributeValue} from 'did-cc';
import validation from '../helpers/validation';
import {check, validationResult } from 'express-validator';
import * as createError  from 'http-errors';

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })


const router: Router = Router();


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
        const {id,name,logo} = req.body;
        let organizationObj = new Organization({id,name,logo});
        await ctrls.organization.create(organizationObj);
        const organization = new Organization(await ctrls.organization.show(id));
        res.status(200).json(organization);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});


router.post('/assign_credential',validation.createOrganizationRules, async (req, res, next) => {
    const errors = validationResult(req);
   // res.send(req.body.attributes);
    //  if (!errors.isEmpty()) {
    //    return res.status(422).json({ errors: errors.array() });
    //  }
     try {
         const {email,credential_id,attributes} = req.body;
         const ctrls = req.ctrls;
         await ctrls.organization.assign_credential(email,credential_id,attributes);
        // await OrganizationControllerBackEnd.assign_credential(email,credential_id,attributes);
         res.status(200).json();
     } catch (err) {
         console.log(err);
         res.status(500).send(err.responses[0].error);
     }
 });

export const OrganizationExpressController: Router = router;