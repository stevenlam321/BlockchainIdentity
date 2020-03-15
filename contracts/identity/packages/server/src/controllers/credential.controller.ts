
import { Router, Request, Response } from 'express';
import {InitFabricCtrls} from '../convector';
import { Person,Attribute, Credential } from 'did-cc';
import validation from '../helpers/validation';
import {check, validationResult } from 'express-validator';
import authed from '../middlewares/authed';
import * as createError  from 'http-errors';
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const ctrls = req.ctrls;
        const result_json = await ctrls.credential.index();
        res.send(result_json);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/',authed,validation.createCredentialRules, async (req, res, next) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = req.user;

    if(user.role != 'org'){
        next(createError(400,'Invalid permission'));
    }
    const organization_id = user.org_id;
   
    try {
        const {id,name,attribute_ids} = req.body;
        let credentialObj = new Credential({id,name,organization_id,attribute_ids});
        const ctrls = req.ctrls;
        await ctrls.credential.create(credentialObj);
        const credential = new Credential(await ctrls.credential.show(id));
        res.status(200).send(credential);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.responses[0].error);
    }
});

export const CredentialExpressController: Router = router;