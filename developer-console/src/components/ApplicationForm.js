import React,{useState} from 'react';
import {Button,Modal,Form} from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import DisplayErrors from './DisplayErrors';
import axios from 'axios';

const createSchema = yup.object().shape({
    name: yup.string().required().max(30),
    public_key: yup.string().required().test(
        'is-public-key',
        '${path} is not a valid format',
        value => value.match(/^-----BEGIN PUBLIC KEY-----.+-----END PUBLIC KEY-----$/)
      )
});

export default function ApplicationForm(props){
    const { register, handleSubmit, errors } = useForm({
        validationSchema: createSchema
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  
    const onSubmit = data => {
        props.commonStore.setLoading(true);
        axios.post('/applications/', data)
          .then(function (response) {
            props.applicationStore.addApplication(response.data);
            handleClose();
          })
          .catch(function (error) {
            alert(error.response.data.message);
          }).finally(function(){
            props.commonStore.setLoading(false);
          });
        
    }
    const submit = () => {
        
    }
    return (
        <div>
        <Button variant="primary" onClick={handleShow}>
        Create App
        </Button>
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        <Modal.Title>Create a New App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)} id="form">
                    <Form.Group>
                        <Form.Label htmlFor="name">App Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="App Name" id="name" ref={register}/>
                        <DisplayErrors errors={errors.name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="public_key">Public Key</Form.Label>
                        <div>Format: -----BEGIN PUBLIC KEY-----XX...-----END PUBLIC KEY-----</div>
                        <Form.Control as="textarea" rows="5" name='public_key' placeholder="Public Key" id="public_key" ref={register}/>
                        <DisplayErrors errors={errors.public_key}/>
                    </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" form='form' type="submit" onClick={submit}>
            Create
        </Button>
        </Modal.Footer>
    </Modal>
    </div>);
}
