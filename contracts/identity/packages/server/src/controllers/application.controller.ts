import { Router, Request, Response,Next } from 'express';
import { Attribute, Application ,ApplicationRequest} from 'did-cc';
import * as createError  from 'http-errors';
import validation from '../helpers/validation';
import {check, validationResult } from 'express-validator';
import authed from '../middlewares/authed';
import * as crypto from 'crypto';
const router: Router = Router();

router.get('/', authed,async (req, res, next) => {
    try {
        const user = req.user;
        const ctrls = req.ctrls;
        const applications = await ctrls.application.myApplications(user.identityID);
        const application_json = [];
        applications.forEach(element => {
            application_json.push(new Application(element).toJSON());
        });
       res.status(200).json(application_json);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});

router.post('/', authed,validation.createApplicationRules, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    try {
        const {name,public_key} = req.body;
        const id = "APP-"+ Math.random().toString(36).substr(2,10); 
        const secret = crypto.randomBytes(20).toString('hex');
        const person_id = req.user.identityID;

        let applicationObj = new Application({id,name,person_id,public_key,secret});
        const ctrls = req.ctrls;
        await ctrls.application.create(applicationObj);
        const application = new Application(await ctrls.application.show(id));
        res.status(200).json(application);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});


router.get('/request_data/:id/:secret',validation.applicationRequestInfoRules, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    try {
        let { id,secret } = req.params;
        const ctrls = req.ctrls;

       const applicationRequest = new ApplicationRequest(await ctrls.application.getApplicationRequestData(id,secret));
       res.status(200).json(applicationRequest);
    } catch (err) {
        res.status(200).json(err);
       // next(createError(400,err.responses[0].error.message));
     }
});

router.post('/request_info/',validation.applicationRequestInfoRules, async (req, res, next) => {
  
    const {app_id,person_id,credentials,email,mobile} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    try {
        const ctrls = req.ctrls;
       const request_info =  await ctrls.application.showApplicationRequestInfo(app_id,person_id,email,mobile,credentials);
       res.status(200).json(request_info);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
     }
});

router.post('/approve_request/',validation.appproveApplicationRequestRules, authed, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    try {
        const id = "REQ-"+ Math.random().toString(36).substr(2,10); 
        const {app_id,credentials,email,mobile} = req.body;
        const person_id = req.user.identityID;
        const ctrls = req.ctrls;
        const data = await ctrls.application.approveApplicationRequest(id,app_id,person_id,email,mobile,credentials)
    
        res.status(200).json("OK");
    } catch (err) {
        res.status(400).json(err.responses[0].error.message);
       // next(createError(400,err.responses[0].error.message));
     }
});

router.put('/:id',authed,validation.updateApplicationRules, async (req, res, next) => {
    let { id } = req.params;
    const {name,public_key} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    const user = req.user;
    try {
        const ctrls = req.ctrls;
        const application = new Application(await ctrls.application.show(id));
        if(application.person_id != user.identityID){
            next(createError(403,'Invalid permission'));
        }
        application.name = name;
        application.public_key = public_key;
        await ctrls.application.update(application);
        res.status(200).json(application);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});

export const ApplicationExpressController: Router = router;