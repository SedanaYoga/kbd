import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, InputGroup } from 'react-bootstrap'
import { setDoc, Timestamp, doc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase.init'
import { uploadFiles } from '../../../firebase/firebase.utils'
import { fileNameToExtension, displayIdGenerator } from '../../../helper/textHelper'
import { useDispatch } from 'react-redux'
import { notifHandler } from '../../../helper/errorHelper'
import Image from 'next/image'

export const InputPuppies = ({ updatePuppy, show, onHide }) => {
  const [newQuality, setNewQuality] = useState("")
  const [newColor, setColor] = useState("")
  const [newDob, setNewDob] = useState("")
  const [newSex, setNewSex] = useState("")
  const [newVideo, setNewVideo] = useState(null)

  const [file, setFile] = useState("");

  const dispatch = useDispatch()

  function handleChange(event) {
    setFile(event.target.files);
  }


  const createPuppies = async () => {
    // Check if the image file inputs exist
    if (!file) {
      alert("Please upload an image first!");
    } else {
      // CHECK: the length can't great than 4 (One for video)
      if (file.length > 4) {
        // will be a warning message
        return notifHandler(dispatch, 'You can only upload a maximum of 4 images!', 'warning')
      }
      if (!newQuality || !newColor || !newDob || !newSex) {
        return notifHandler(dispatch, 'Please fulfill all fields!', 'warning')
      }

      notifHandler(dispatch, 'Uploading and Creating...', 'warning')
      try {
        // Promise of image Files
        const arrayImagesAndVideo = newVideo ? [...Array.from(file), newVideo] : Array.from(file)
        const filesToPromiseAll = arrayImagesAndVideo.map((obj, index) => {
          const fileName = `${fileNameToExtension(obj.name).fileName}_${new Date().toISOString()}`
          return uploadFiles(obj, `${index === arrayImagesAndVideo.length - 1 ? 'video' : 'image'}`, fileName)
        })

        // Do await for Promise all
        const uploadResults = await Promise.all(filesToPromiseAll)

        // Set object to be an input of displayIdGenerator
        const displayIdObject = {
          breedQuality: newQuality,
          color: newColor,
          dob: newDob,
          sex: newSex
        }
        const displayId = displayIdGenerator(displayIdObject)

        const docPath = `${+new Date()}_${displayId}`
        const puppyWithIdRef = doc(db, "puppies", `${+new Date()}_${displayId}`)
        // ADD: Puppy data
        const objectToUpload = {
          ...displayIdObject,
          displayId,
          dob: Timestamp.fromDate(new Date(newDob)),
          bookedStatus: 'available',
          imgUrl: uploadResults,
        }
        await setDoc(puppyWithIdRef, objectToUpload)
        updatePuppy({ id: docPath, ...objectToUpload })
        notifHandler(dispatch, 'Your puppy has been created!', 'success')
      } catch (error) {
        notifHandler(dispatch, error.message, 'error')
      }

      onHide()
      console.log('Pup Added')
    }
    setColor(null)
    setNewQuality(null)
    setNewSex(null)
    setNewDob(null)
    setNewVideo(null)
    setFile(null)
  }

  const videoChangeHandler = async (event) => {
    setNewVideo(event.target.files[0])
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
    setNewDob(value)
  }

  return (
    <>
      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
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

          <InputGroup className='mb-3'>
            <label>
              Puppy Images:
              <input className='form-control' type="file" onChange={handleChange} accept="/image/*" multiple />
            </label>
            {file && <div className='mt-3 d-flex flex-row gap-2'>
              {Array.from(file).map(imgObj => (
                <Image className='rounded' key={imgObj.name} src={URL.createObjectURL(imgObj)} width='100px' height='100px' />
              )
              )}
            </div>}
          </InputGroup>

          <InputGroup className='mb-3'>
            <label>
              Upload Puppy Video:
              <input
                className='form-control'
                type='file'
                onChange={videoChangeHandler}
              />
            </label>
          </InputGroup>

          {newVideo &&
            <video autoPlay={true} className='rounded' controls width={280} height={500}>
              <source src={URL.createObjectURL(newVideo)}
                type="video/mp4" />
            </video>
          }

        </Modal.Body>
        <Modal.Body>
          <Button onClick={createPuppies}>Add Puppies</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}
