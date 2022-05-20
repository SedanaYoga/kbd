
import React, {useState} from 'react'
import { Button, Modal} from 'react-bootstrap'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebase/firebase.init'

const SuccessAddPup = () => {
    return (
        <>
            <Modal>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Puppies
                    </Modal.Title>
    
                </Modal.Header>
            </Modal>
        </>
    )
}

export default SuccessAddPup