
import React, {useState} from 'react'
import { Button, Modal, InputGroup, FormControl, Form, FormCheck } from 'react-bootstrap'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebase/firebase.init'



export const InputPuppies = (props) => {
    const [newQuality, setNewQuality] = useState("")
    const [newColor, setColor] = useState("")
    const [newDob, setNewDob] = useState("")
    const [newStambum, setNewStambum] = useState("")
    const [newVaccinated, setNewVaccinated] = useState("")
    const [newSex, setNewSex] = useState("")
    const [newUrl, setNewUrl] = useState("")
    const [newId, setNewId] = useState("")
  
    const puppiesCollectionRef = collection(db, "puppies")

    const createPuppies = async () => {
      await addDoc(puppiesCollectionRef, 
        { bookedStatus: 'available', 
        displayId: newQuality.slice(0, 1) + newColor.slice(0, 1).toUpperCase() 
                  + newDob.toDate().toISOString().slice(0, 10).slice(8, 10) 
                  + newDob.toDate().toISOString().slice(0, 10).slice(5, 7)
                  + newDob.toDate().toISOString().slice(0, 10).slice(2, 4)
                  + newSex.slice(0, 1).toUpperCase(), 
        dob: newDob,  
        imgUrl: newUrl, 
        priceTag: {breedQuality: newQuality, 
                  coatColor: newColor, 
                  vaccinated: newVaccinated, 
                  stambum: newStambum}, 
        sex: newSex });
  
      props.onHide()
      // inputDisplayId()
      console.log('User Added')
    }

   const inputVaccinated = (e) => {
     const value = e.target.value
     const newValue = value === 'true' ? true : false
     setNewVaccinated(newValue)
   }

   const inputStambum = (e) => {
     const value = e.target.value
     const newValue = value === 'true' ? true : false
     setNewStambum(newValue)
   }

   const inputSex = (e) => {
     const value = e.target.value
     const newValue = value === 'true' ? 'male' : 'female'
     setNewSex(newValue)
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
                <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Quality"
                      aria-label="Quality"
                      aria-describedby="basic-addon1"
                      name="breedQuality"
                      onChange={(event) => {setNewQuality(event.target.value)}}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Color"
                      aria-label="Color"
                      aria-describedby="basic-addon1"
                      name="coatColor"
                      onChange={(event) => {setColor(event.target.value)}}
                    />
                </InputGroup>

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

                <Form>
                  <Form.Label className='inline'>
                    Stambum History :
                  </Form.Label>
                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Stambum"
                          type={type}
                          value="true"
                          id={`inline-${type}-1`}
                          onChange={inputStambum}
                        />
                        <Form.Check
                          inline
                          label="No Stambum"
                          type={type}
                          value="false"
                          id={`inline-${type}-2`}
                          onChange={inputStambum}
                        />
                      </div>
                    ))}
                </Form>

                <Form>
                  <Form.Label className='inline'>
                    Vaccinating History :
                  </Form.Label>

                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Vaccinated"
                          name="vaccinated"
                          type={type}
                          id={`inline-${type}-1`}
                          value='true'
                          onChange={inputVaccinated}
                        />
                        <Form.Check
                          inline
                          label="Unvaccinated"
                          name="vaccinated"
                          type={type}
                          id={`inline-${type}-2`}
                          value='false'
                          onChange={inputVaccinated}
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
      </>
    )
  
  }
