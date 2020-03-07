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

export default function EditApplicationForm(props){
    const { register, handleSubmit, errors } = useForm({
        validationSchema: createSchema
    })
    const application = props.application;
    if(application){
       
    }
  
    const handleClose = ()=>{props.closeEditForm()};
    
    const onSubmit = data => {
       const token = props.commonStore.token;
        props.commonStore.setLoading(true);
        axios.put('/applications/'+ application.id , data)
          .then(function (response) {
              console.log(response);
            //props.applicationStore.addApplication(response.data);
            handleClose();
            props.applicationStore.loadApplications();
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
        <Modal show={props.show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        <Modal.Title>Edit App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)} id="form">
                    <Form.Group>
                        <Form.Label htmlFor="name">App Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="App Name" id="name" ref={register} defaultValue={application?application.name:''}/>
                        <DisplayErrors errors={errors.name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="public_key">Public Key</Form.Label>
                        <div>Format: -----BEGIN PUBLIC KEY-----XX...-----END PUBLIC KEY-----</div>
                        <Form.Control as="textarea" rows="5" name='public_key' placeholder="Public Key" id="public_key" ref={register} defaultValue={application?application.public_key:''}/>
                        <DisplayErrors errors={errors.public_key}/>
                    </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" form='form' type="submit" onClick={submit}>
            Save
        </Button>
        </Modal.Footer>
    </Modal>
    </div>);
}
