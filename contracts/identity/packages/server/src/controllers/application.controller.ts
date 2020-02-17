
import { Router, Request, Response,Next } from 'express';
import { AttributeControllerBackEnd,Init} from '../convector';
import { Attribute } from 'did-cc';
import * as createError  from 'http-errors';
import validation from '../helpers/validation';
import {check, validationResult } from 'express-validator';
import authed from '../middlewares/authed';

const router: Router = Router();

router.get('/', authed,async (req, res, next) => {
    try {
        const ctrls = await Init();
        
        const attributes = await ctrls.attribute.index();

        const attribute_json = [];
        attributes.forEach(element => {
            attribute_json.push(new Attribute(element).toJSON());
        });
        res.status(200).json(attribute_json);
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
router.post('/', validation.createAttributeRules, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }

    try {
        const {id,name} = req.body;
        let attributeObj = new Attribute({id,name});
        await AttributeControllerBackEnd.create(attributeObj);
        const attribute = new Attribute(await AttributeControllerBackEnd.show(id));
        res.status(200).json(attribute);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});

router.put('/:id',validation.updateAttributeRules, async (req, res, next) => {
    let { id } = req.params;
    const {name} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400,{ errors: errors.array()}));
    }
    try {
        let attributeObj = new Attribute({id,name});
        await AttributeControllerBackEnd.update(attributeObj);
        const attribute = new Attribute(await AttributeControllerBackEnd.show(id));
        res.status(200).json(attribute);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});

router.delete('/:id', async (req, res, next) => {
    let { id } = req.params;
    try {
        await AttributeControllerBackEnd.delete(id);
        res.status(200).json();
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});
export const AttributeExpressController: Router = router;