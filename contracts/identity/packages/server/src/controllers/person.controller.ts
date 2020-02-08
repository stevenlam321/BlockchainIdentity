
import { Router, Request, Response } from 'express';
import {PersonControllerBackEnd, InitServerIdentity } from '../convector';
import { Person,Attribute } from 'did-cc';
import validation from '../helpers/validation';
import {check, validationResult } from 'express-validator';
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })


const router: Router = Router();
router.get('/', async (req: Request, res: Response) => {
  res.send( "helki");
});

router.post('/',validation.createPersonRules, async (req: Request, res: Response) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
         const id = "P-"+Math.random().toString(36).substr(2,10);
         const {email,mobile} = req.body;
         let person = new Person({id,email,mobile});
        await PersonControllerBackEnd.create(person);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.responses[0].error);
    }
});


router.get('/:id', async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        const person = new Person(await PersonControllerBackEnd.show(id));
        res.send(person.toJSON());
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export const PersonExpressController: Router = router;