
import React, { useState, useEffect } from 'react'
import { Button, Modal, InputGroup, FormControl, Form, FormCheck } from 'react-bootstrap'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebase/firebase.init'
import SuccessAddPup from './AddSuccess.component'
import styles from './Table.module.scss'
import { storage } from '../../../firebase/firebase.init'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { uploadFiles } from '../../../firebase/firebase.utils'
import { fileNameToExtension } from '../../../helper/textHelper'

export const InputPuppies = (props) => {
  const [modalSuccess, setSuccess] = useState(false)
  const [newQuality, setNewQuality] = useState("")
  const [newColor, setColor] = useState("")
  const [newDob, setNewDob] = useState("")
  const [newSex, setNewSex] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const [file, setFile] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const puppiesCollectionRef = collection(db, "puppies")

  const createPuppies = async () => {
    if (!file) {
      alert("Please upload an image first!");
    } else {
      const fileName = `${fileNameToExtension(file.name).fileName}_${+ new Date()}`
      const uploadResult = await uploadFiles(file, 'image', fileName)
      await addDoc(puppiesCollectionRef,
        {
          bookedStatus: 'available',
          displayId: newQuality.slice(0, 1).toUpperCase() + newColor.slice(0, 1).toUpperCase()
            + newDob.toDate().toISOString().slice(0, 10).slice(8, 10)
            + newDob.toDate().toISOString().slice(0, 10).slice(5, 7)
            + newDob.toDate().toISOString().slice(0, 10).slice(2, 4)
            + newSex.slice(0, 1).toUpperCase(),
          dob: newDob,
          imgUrl: [
            uploadResult, uploadResult, uploadResult, uploadResult, uploadResult
          ],
          breedQuality: newQuality,
          color: newColor,
          sex: newSex
        });

      props.onHide()
      // inputDisplayId()
      console.log('Pup Added')
    }

    setSuccess(true)
  }

  const inputSex = (e) => {
    const value = e.target.value
    const newValue = value === 'true' ? 'male' : 'female'
    setNewSex(newValue)
  }

  const inputColor = (e) => {
    const value = e.target.value
    const newValue = () => {
      if (value === '1') {
        return 'brown'
      } else if (value === '2') {
        return 'black'
      } else if (value === '3') {
        return 'white'
      } else if (value === '4') {
        return 'briddle'
      }
    }

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
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label="normal"
                name="group3"
                type="radio"
                value="1"
                id={`inline-radio-1`}
                onChange={inputQuality}
              />
              <Form.Check
                inline
                name="group3"
                label="premium"
                type="radio"
                value="2"
                id={`inline-radio-2`}
                onChange={inputQuality}
              />
              <Form.Check
                inline
                name="group3"
                label="champion"
                type="radio"
                value="3"
                id={`inline-radio-3`}
                onChange={inputQuality}
              />
            </div>
          </Form>
          <Form>
            <Form.Label className='inline'>
              Color :
            </Form.Label>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                name="group1"
                label="Brown"
                type="radio"
                value="1"
                id={`inline-radio-1`}
                onChange={inputColor}
              />
              <Form.Check
                inline
                name="group1"
                label="Black"
                type="radio"
                value="2"
                id={`inline-radio-2`}
                onChange={inputColor}
              />
              <Form.Check
                inline
                name="group1"
                label="White"
                type="radio"
                value="3"
                id={`inline-radio-3`}
                onChange={inputColor}
              />
              <Form.Check
                inline
                name="group1"
                label="Bridle"
                type="radio"
                value="4"
                id={`inline-radio-4`}
                onChange={inputColor}
              />
            </div>
          </Form>
          <Form>
            <Form.Label className='inline'>
              Sex :
            </Form.Label>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                name="group2"
                label="Male"
                type="radio"
                value="true"
                id={`inline-radio-1`}
                onChange={inputSex}
              />
              <Form.Check
                inline
                name="group2"
                label="Female"
                type="radio"
                value="false"
                id={`inline-radio-2`}
                onChange={inputSex}
              />
            </div>
          </Form>
          <Form className='w-100'>
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
          <div>
            <input type="file" onChange={handleChange} accept="/image/*" multiple />
            {/* <button onClick={handleUpload}>Upload to Firebase</button> */}
            {/* <p>{percent} "% done"</p> */}
          </div>
        </Modal.Body>
        <Modal.Body>
          <Button onClick={createPuppies}>Add Puppies</Button>
        </Modal.Body>
      </Modal>
      <SuccessAddPup show={modalSuccess} onHide={() => setSuccess(false)} />
    </>
  )

}
  // const videoChangeHandler = async (event) => {
  //   await uploadVideo(event.target.files[0])
  //   notifHandler(dispatch, 'Your video is successfully uploaded!', 'success')
  // }

  // return (
  //   <>

  //     <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           Add Puppies
  //         </Modal.Title>

  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form>
  //           <Form.Label className='inline'>
  //             Quality :
  //           </Form.Label>
  //           <div key={`inline-radio`} className="mb-3">
  //             <Form.Check
  //               inline
  //               label="normal"
  //               name="group3"
  //               type="radio"
  //               value="1"
  //               id={`inline-radio-1`}
  //               onChange={inputQuality}
  //             />
  //             <Form.Check
  //               inline
  //               name="group3"
  //               label="premium"
  //               type="radio"
  //               value="2"
  //               id={`inline-radio-2`}
  //               onChange={inputQuality}
  //             />
  //             <Form.Check
  //               inline
  //               name="group3"
  //               label="champion"
  //               type="radio"
  //               value="3"
  //               id={`inline-radio-3`}
  //               onChange={inputQuality}
  //             />
  //           </div>
  //         </Form>
  //         <Form>
  //           <Form.Label className='inline'>
  //             Color :
  //           </Form.Label>
  //           <div key={`inline-radio`} className="mb-3">
  //             <Form.Check
  //               inline
  //               name="group1"
  //               label="Brown"
  //               type="radio"
  //               value="1"
  //               id={`inline-radio-1`}
  //               onChange={inputColor}
  //             />
  //             <Form.Check
  //               inline
  //               name="group1"
  //               label="Black"
  //               type="radio"
  //               value="2"
  //               id={`inline-radio-2`}
  //               onChange={inputColor}
  //             />
  //             <Form.Check
  //               inline
  //               name="group1"
  //               label="White"
  //               type="radio"
  //               value="3"
  //               id={`inline-radio-3`}
  //               onChange={inputColor}
  //             />
  //             <Form.Check
  //               inline
  //               name="group1"
  //               label="Bridle"
  //               type="radio"
  //               value="4"
  //               id={`inline-radio-4`}
  //               onChange={inputColor}
  //             />
  //           </div>
  //         </Form>
  //         <Form>
  //           <Form.Label className='inline'>
  //             Sex :
  //           </Form.Label>
  //           <div key={`inline-radio`} className="mb-3">
  //             <Form.Check
  //               inline
  //               name="group2"
  //               label="Male"
  //               type="radio"
  //               value="true"
  //               id={`inline-radio-1`}
  //               onChange={inputSex}
  //             />
  //             <Form.Check
  //               inline
  //               name="group2"
  //               label="Female"
  //               type="radio"
  //               value="false"
  //               id={`inline-radio-2`}
  //               onChange={inputSex}
  //             />
  //           </div>
  //         </Form>
  //         <Form className='w-100'>
  //           <Form.Group className='w-100 d-flex justify-content-between mb-3'>
  //             <label>
  //               Date of Birth : {' '}
  //               <input
  //                 className='form-control '
  //                 type='date'
  //                 name='dob'
  //                 onChange={inputDate}
  //               />
  //             </label>
  //           </Form.Group>
  //         </Form>

  //         <InputGroup className="mb-3">
  //           <FormControl
  //             placeholder="Image Url"
  //             aria-label="Image Url"
  //             aria-describedby="basic-addon1"
  //             onChange={(event) => { setNewUrl(event.target.value) }}
  //           />
  //         </InputGroup>

  //         <InputGroup className='mb-3'>
  //           <label>
  //             Upload Puppy Video:
  //             <input
  //               className='form-control'
  //               type='file'
  //               onChange={videoChangeHandler}
  //             />
  //           </label>
  //         </InputGroup>

  //         {videoToPlay &&
  //           <ReactPlayer url={videoToPlay.downloadUrl} playing={true} controls={true} height='500px' width='280px' />
  //         }

  //       </Modal.Body>
  //       <Modal.Body>
  //         <Button onClick={createPuppies}>Add Puppies</Button>
  //       </Modal.Body>
  //     </Modal>
  //     <SuccessAddPup show={modalSuccess} onHide={() => setSuccess(false)} />
  //   </>
  // )

// }
