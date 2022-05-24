import React, {useState} from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { collection, addDoc  } from 'firebase/firestore'
import { db } from '../../../firebase/firebase.init'
import { addUserFromDashboard } from '../../../firebase/firebase.utils'

export const InputUser = (props) => {

    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
      })

      const handleChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        setUserInput({ ...userInput, [name]: value })
      }
    
    // const usersCollectionRef = collection(db, 'users')
    
    const createUser = async () => {

        await addUserFromDashboard(userInput)

        props.onHide()
        window.location.reload()
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
                            aria-label='First Name'
                            aria-describedby='basic-addon1'
                            value={userInput.firstName}
                            name="firstName"
                            onChange={handleChange}
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder='Last Name'
                            aria-label='Last Name'
                            aria-describedby='basic-addon1'
                            value={userInput.lastName}
                            name="lastName"
                            onChange={handleChange}
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder='Email User'
                            aria-label='Email User'
                            aria-describedby='basic-addon1'
                            value={userInput.email}
                            name="email"
                            onChange={handleChange}
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder='Password'
                            aria-label='Password'
                            aria-describedby='basic-addon1'
                            value={userInput.password}
                            name="password"
                            onChange={handleChange}
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder='Phone Number'
                            aria-label='phone number'
                            aria-describedby='basic-addon1'
                            value={userInput.phoneNumber}
                            name="phoneNumber"
                            onChange={handleChange}
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder='Address'
                            aria-label='address'
                            aria-describedby='basic-addon1'
                            value={userInput.address}
                            name="address"
                            onChange={handleChange}
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