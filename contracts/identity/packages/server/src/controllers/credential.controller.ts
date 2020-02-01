
import { Router, Request, Response } from 'express';
import {CredentialControllerBackEnd, InitServerIdentity } from '../convector';
import { Person,Attribute, Credential } from 'did-cc';
import validation from '../helpers/validation';
import {check, validationResult } from 'express-validator';

//Credential

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
    //res.send(req.body.attributes);
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
// router.post('/',validation.addCredentialAttributeRules, async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//      return res.status(422).json({ errors: errors.array() });
//    }
//    try {
//         const {id,name,organization_id} = req.body;
//         let credential = new Credential({id,name,organization_id,credential_attributes:[]});
//        await CredentialControllerBackEnd.create(credential);
//        res.status(200).send();
//    } catch (err) {
//        console.log(err);
//        res.status(500).send(err.responses[0].error);
//    }
// });


// router.get('/:id', async (req: Request, res: Response) => {
//     try {
//         let { id } = req.params;
//         const organization = new Organization(await PersonControllerBackEnd.show(id));
//         res.send(organization.toJSON());
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// });
// router.post('/',validation.createOrganizationRules, async (req: Request, res: Response) => {
//    const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     try {
//         const {id,name} = req.body;
//         let organization = new Organization({id,name,logo:'hksar.png'});
//         await PersonControllerBackEnd.create(organization);
//         res.status(200).send();
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.responses[0].error);
//     }
// });

// router.put('/', async (req: Request, res: Response) => {
//     try {
//         const {id,name} = req.body;
//         let organization = new Organization({id,name});
//         await PersonControllerBackEnd.update(organization);
//         res.status(200).send();
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.responses[0].error);
//     }
// });

// router.delete('/', async (req: Request, res: Response) => {
//     try {
//         const {id} = req.body;
//         await PersonControllerBackEnd.delete(id);
//         res.status(200).send();
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.responses[0].error);
//     }
// });
export const CredentialExpressController: Router = router;