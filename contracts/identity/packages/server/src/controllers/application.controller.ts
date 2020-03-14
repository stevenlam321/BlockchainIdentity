
import { Router, Request, Response,Next } from 'express';
import { AttributeControllerBackEnd,Init} from '../convector';
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

router.get('/:id',authed, async (req, res, next) => {
    try {
       // console.log(req.usIniter);
        let { id } = req.params;
        // const ctrls = await Init(req.user.identityID);
        const ctrls = req.ctrls;
        
        const attribute = new Attribute(await ctrls.attribute.show(id));

       // const attribute = new Attribute(await AttributeControllerBackEnd.show(id));
        res.status(200).json(attribute);
    } catch (err) {
        return next(createError(404,err.responses[0].error.message));
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

router.post('/create_request', authed,validation.createApplicationRequestRules, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    try {
        const {app_id,person_id,credentials} = req.body;
        const id = "APPR-"+ Math.random().toString(36).substr(2,10); 
       // const expired_at = new Date();
        let applicationRequestObj = new ApplicationRequest({id,app_id,person_id,credentials});
        const ctrls = req.ctrls;
        await ctrls.application.createRequest(applicationRequestObj);
        const applicationRequest = new ApplicationRequest(await ctrls.application.showApplicationRequest(id));
        res.status(200).json(applicationRequest);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});

router.get('/request/:id', authed, async (req, res, next) => {
    let { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    try {
        const ctrls = req.ctrls;
        //const person = 

     //   const applicationRequest = new ApplicationRequest(await ctrls.application.showApplicationRequest(id));
     //   res.status(200).json(applicationRequest);
    } catch (err) {
        res.status(200).json(err);
       // next(createError(400,err.responses[0].error.message));
     }
});

router.get('/request_data/:id', authed, async (req, res, next) => {
    let { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    try {
        const ctrls = req.ctrls;
        
        //const applicationRequest = new ApplicationRequest(await ctrls.application.showApplicationRequest(id));
      //  res.status(200).json(applicationRequest);
    } catch (err) {
        res.status(200).json(err);
       // next(createError(400,err.responses[0].error.message));
     }
});

router.get('/approve_request/:id', authed, async (req, res, next) => {
    let { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    try {
        const ctrls = req.ctrls;
        const applicationRequest = new ApplicationRequest(await ctrls.application.showApplicationRequest(id));
        res.status(200).json(applicationRequest);
    } catch (err) {
        res.status(200).json(err);
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