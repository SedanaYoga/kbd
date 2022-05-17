import React, {useState} from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { collection, addDoc  } from 'firebase/firestore'
import { db } from '../../../firebase/firebase.init'

export const InputUser = (props) => {
    const [newName, setNewName] = useState('') 
    const [newLastName, setNewLastName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const usersCollectionRef = collection(db, 'users')

    const createUser = async () => {
        await addDoc(usersCollectionRef, {
            firstName: newName,
            lastName: newLastName,
            isAdmin: false,
            email: newEmail,
            password: newPassword,
            createdAt: new Date(),
            lastLoginAt: new Date(),
            imgUrl: ''
        })

        props.onHide()
        console.log('User added')
    }

    return (
        <>
            <Modal
            {...props}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder='First Name'
                            aria-label='Firs Name'
                            aria-describedby='basic-addon1'
                            onChange={(event) => {setNewName(event.target.value)}}
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder='Last Name'
                            aria-label='Last Name'
                            aria-describedby='basic-addon1'
                            onChange={(event) => {setNewLastName(event.target.value)}}
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder='Email User'
                            aria-label='Email User'
                            aria-describedby='basic-addon1'
                            onChange={(event) => {setNewEmail(event.target.value)}}
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder='Password'
                            aria-label='Password'
                            aria-describedby='basic-addon1'
                            onChange={(event) => {setNewPassword(event.target.value)}}
                            />
                    </InputGroup>
                </Modal.Body>
                <Modal.Body>
                    <Button onClick={createUser}>Create User</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}