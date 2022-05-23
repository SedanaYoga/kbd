
import React, {useState} from 'react'
import { Button, Modal, InputGroup, FormControl, Form, FormCheck } from 'react-bootstrap'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebase/firebase.init'
import SuccessAddPup from './AddSuccess.component'


export const InputPuppies = (props) => {
    const [modalSuccess, setSuccess] = useState(false)
    const [newQuality, setNewQuality] = useState("")
    const [newColor, setColor] = useState("")
    const [newDob, setNewDob] = useState("")
    const [newSex, setNewSex] = useState("")
    const [newUrl, setNewUrl] = useState("")
  
    const puppiesCollectionRef = collection(db, "puppies")

    const createPuppies = async () => {
      await addDoc(puppiesCollectionRef, 
        { bookedStatus: 'available', 
        displayId: newQuality.slice(0, 1).toUpperCase() + newColor.slice(0, 1).toUpperCase() 
                  + newDob.toDate().toISOString().slice(0, 10).slice(8, 10) 
                  + newDob.toDate().toISOString().slice(0, 10).slice(5, 7)
                  + newDob.toDate().toISOString().slice(0, 10).slice(2, 4)
                  + newSex.slice(0, 1).toUpperCase(), 
        dob: newDob,  
        imgUrl: [
          newUrl, newUrl, newUrl, newUrl, newUrl
        ], 
        breedQuality: newQuality,
        color: newColor,
        sex: newSex });
  
      props.onHide()
      // inputDisplayId()
      console.log('Pup Added')

      setSuccess(true)
    }

   const inputSex = (e) => {
     const value = e.target.value
     const newValue = value === 'true' ? 'male' : 'female'
     setNewSex(newValue)
   }

   const inputColor = (e) => {
     const value = e.target.value
     const newValue = () => {if (value === '1') {
       return 'brown'
     } else if (value === '2') {
       return 'black'
     } else if (value === '3') {
       return 'white'
     } else if (value === '4') {
       return 'briddle'
     }}

     setColor(newValue)
   }

   const inputQuality = (e) => {
     const value = e.target.value
     const newValue = () => {
       if (value === '1') {
         return 'normal'
       } else if (value === '2') {
         return 'premium'
       } else if (value === '3') {
         return 'champion'
       }
     }

     setNewQuality(newValue)
   }

   const inputDate = (e) => {
     const value = e.target.value
     const newValue = Timestamp.fromDate(new Date(value))
     setNewDob(newValue)

     console.log(newValue)
   }
  
    return (
      <>
        
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Puppies
                </Modal.Title>
  
            </Modal.Header>
            <Modal.Body>
            <Form>
                  <Form.Label className='inline'>
                    Quality :
                  </Form.Label>
                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="normal"
                          type={type}
                          value="1"
                          id={`inline-${type}-1`}
                          onChange={inputQuality}
                        />
                        <Form.Check
                          inline
                          label="premium"
                          type={type}
                          value="2"
                          id={`inline-${type}-2`}
                          onChange={inputQuality}
                        />
                        <Form.Check
                          inline
                          label="champion"
                          type={type}
                          value="3"
                          id={`inline-${type}-3`}
                          onChange={inputQuality}
                        />
                      </div>
                    ))}
                </Form>
                <Form>
                  <Form.Label className='inline'>
                    Color :
                  </Form.Label>
                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Brown"
                          type={type}
                          value="1"
                          id={`inline-${type}-1`}
                          onChange={inputColor}
                        />
                        <Form.Check
                          inline
                          label="Black"
                          type={type}
                          value="2"
                          id={`inline-${type}-2`}
                          onChange={inputColor}
                        />
                        <Form.Check
                          inline
                          label="White"
                          type={type}
                          value="3"
                          id={`inline-${type}-3`}
                          onChange={inputColor}
                        />
                        <Form.Check
                          inline
                          label="Briddle"
                          type={type}
                          value="4"
                          id={`inline-${type}-4`}
                          onChange={inputColor}
                        />
                      </div>
                    ))}
                </Form>
                <Form>
                  <Form.Label className='inline'>
                    Sex :
                  </Form.Label>
                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Male"
                          type={type}
                          value="true"
                          id={`inline-${type}-1`}
                          onChange={inputSex}
                        />
                        <Form.Check
                          inline
                          label="Female"
                          type={type}
                          value="false"
                          id={`inline-${type}-2`}
                          onChange={inputSex}
                        />
                      </div>
                    ))}
                </Form>
                <Form  className='w-100'>
                  <Form.Group className='w-100 d-flex justify-content-between mb-3'>
                    <label>
                      Date of Birth : {' '}
                      <input
                        className='form-control '
                        type='date'
                        name='dob'
                        onChange={inputDate}
                      />
                    </label>
                  </Form.Group>
                </Form>
                
                <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Image Url"
                      aria-label="Image Url"
                      aria-describedby="basic-addon1"
                      onChange={(event) => {setNewUrl(event.target.value)}}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Body>
                <Button onClick={createPuppies}>Add Puppies</Button>
            </Modal.Body>
        </Modal>
        <SuccessAddPup show={modalSuccess} onHide={() => setSuccess(false)}/>
      </>
    )
  
  }
