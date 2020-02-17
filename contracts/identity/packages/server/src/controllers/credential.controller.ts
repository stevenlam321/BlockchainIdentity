
import { Router, Request, Response } from 'express';
import {CredentialControllerBackEnd } from '../convector';
import { Person,Attribute, Credential } from 'did-cc';
import validation from '../helpers/validation';
import {check, validationResult } from 'express-validator';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result_json = await CredentialControllerBackEnd.index();
        res.send(result_json);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/',validation.createCredentialRules, async (req: Request, res: Response) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
        const {id,name,organization_id,attribute_ids} = req.body;
        let credential = new Credential({id,name,organization_id,attribute_ids});
        await CredentialControllerBackEnd.create(credential);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.responses[0].error);
    }
});

export const CredentialExpressController: Router = router;