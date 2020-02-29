import React,{useState} from 'react';
import {Button,Modal} from 'react-bootstrap';

export default function CreateAppModal(props) {
    return (  
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
            Create
        </Button>
        </Modal.Footer>
    </Modal>
    )
}