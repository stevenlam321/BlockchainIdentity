
import { Router, Request, Response,Next } from 'express';
import { AttributeControllerBackEnd, InitServerIdentity } from '../convector';
import { Attribute } from 'did-cc';
import * as createError  from 'http-errors';
import validation from '../helpers/validation';
import {check, validationResult } from 'express-validator';


const router: Router = Router();

router.get('/', async (req, res, next) => {
    try {
        const attributes = await AttributeControllerBackEnd.index();

        const attribute_json = [];
        attributes.forEach(element => {
            attribute_json.push(new Attribute(element).toJSON());
        });
        res.send(attribute_json);
    } catch (err) {
        next(createError(404,err.responses[0].error.message));
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        const attribute = new Attribute(await AttributeControllerBackEnd.show(id));
        res.send(attribute.toJSON());
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
        let attribute = new Attribute({id,name});
        await AttributeControllerBackEnd.create(attribute);
        res.status(200).send(attribute);
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
        let attribute = new Attribute({id,name});
        await AttributeControllerBackEnd.update(attribute);
        res.status(200).send(attribute);
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});

router.delete('/:id', async (req, res, next) => {
    let { id } = req.params;
    try {
        await AttributeControllerBackEnd.delete(id);
        res.status(200).send();
    } catch (err) {
        next(createError(400,err.responses[0].error.message));
    }
});
export const AttributeExpressController: Router = router;