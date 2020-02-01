
import { Router, Request, Response } from 'express';
import { AttributeControllerBackEnd, InitServerIdentity } from '../convector';
import { Attribute } from 'did-cc';

const router: Router = Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        const attributes = await AttributeControllerBackEnd.index();

        const attribute_json = [];
        attributes.forEach(element => {
            attribute_json.push(new Attribute(element).toJSON());
        });
        res.send(attribute_json);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        const attribute = new Attribute(await AttributeControllerBackEnd.show(id));
        res.send(attribute.toJSON());
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
router.post('/', async (req: Request, res: Response) => {
    try {
        const {id,name} = req.body;
        let attribute = new Attribute({id,name});
        await AttributeControllerBackEnd.create(attribute);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.responses[0].error);
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const {id,name} = req.body;
        let attribute = new Attribute({id,name});
        await AttributeControllerBackEnd.update(attribute);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.responses[0].error);
    }
});

router.delete('/', async (req: Request, res: Response) => {
    try {
        const {id} = req.body;
        await AttributeControllerBackEnd.delete(id);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.responses[0].error);
    }
});
export const AttributeExpressController: Router = router;