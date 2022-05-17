
import React, {useState} from "react"
import {doc, deleteDoc, updateDoc} from 'firebase/firestore'
import { db } from '../../../firebase/firebase.init'
import * as MdIcons from "react-icons/md"
import * as FiIcons from "react-icons/fi"
import styles from './Table.module.scss'
import { Dropdown, Modal, InputGroup, FormControl, Button, Form } from 'react-bootstrap'
import { InputUser } from "./InputUser.component"

const deleteUser = async (row) => {
  const id = row.id
  const userDoc = doc(db, 'users', id)
  await deleteDoc(userDoc)

  console.log(row.id + 'is deleted')
}

const updateAdmin = async (row) => {
  const id = row.id
  const status = row.isAdmin
  const userDoc = doc(db, 'users', id)

  const newField = { isAdmin: !status }

  await updateDoc(userDoc, newField)

  console.log(newField)
}

export const Column = [
  {
    Header: 'Name',
    accessor: (data) =>
      data.displayName || data.firstName + ' ' + data.lastName,
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Created At',
    accessor: 'createdAt',
  },
  {
    Header: 'Last Login At',
    accessor: 'lastLoginAt',
  },
  {
    Header: 'Action',
    Cell: (row) => (
      <div className={`${styles.Btn}`}>
        <span
          className={`${styles.deleteBtn}`}
          onClick={(e) => deleteUser(row.row.original)}
        >
          <MdIcons.MdDeleteForever />
        </span>
        <span
          className={`${styles.editBtn}`}
          onClick={(e) => updateAdmin(row.row.original)}
        >
          <FiIcons.FiEdit />
        </span>
      </div>
    ),
  },
]

const updateCancel = async (row) => {
  const id = row.id
  const userDoc = doc(db, 'booked', id)

  const newField = {status: 'canceled'}
  await updateDoc(userDoc, newField)
  console.log(newField)
}

const updateApprove = async (row) => {
  const id = row.id
  const userDoc = doc(db, 'booked', id)

  const newField = {status: 'approved'}
  await updateDoc(userDoc, newField)
  console.log(newField)
}

const updatePending = async (row) => {
  const id = row.id
  const userDoc = doc(db, 'booked', id)

  const newField = {status: 'pending'}
  await updateDoc(userDoc, newField)
  console.log(newField)
}

const updateDecline = async (row) => {
  const id = row.id
  const userDoc = doc(db, 'booked', id)

  const newField = {status: 'declined'}
  await updateDoc(userDoc, newField)
  console.log(newField)
}

const updateSold = async (row) => {
  const id = row
  const userDoc = doc(db, 'booked', id)

  const newField = {status: 'sold'}
  await updateDoc(userDoc, newField)
  console.log(newField)
}

export const BookingColumn = [
  {
    Header: 'Puppies',
    accessor: 'id_puppy',
  },
  {
    Header: 'Price',
    accessor: 'adopt_price',
  },
  {
    Header: 'Appointment',
    accessor: 'appt_time',
  },
  {
    Header: 'Requester',
    accessor: 'requester_email',
  },
  {
    Header: 'Status',
    Cell: (row) => (
      <Dropdown>
       <Dropdown.Toggle variant="success" id="dropdown-basic">
         {`${row.row.original.status}`}
       </Dropdown.Toggle>   
       <Dropdown.Menu>
        <Dropdown.Item onClick={e => {updatePending(row.row.original)}}>Pending</Dropdown.Item>
        <Dropdown.Item onClick={e => {updateApprove(row.row.original)}}>Approve</Dropdown.Item>
        <Dropdown.Item onClick={e => {updateDecline(row.row.original)}}>Decline</Dropdown.Item>
        <Dropdown.Item onClick={e => {updateCancel(row.row.original)}}>Cancel</Dropdown.Item>
        <Dropdown.Item onClick={e => {updateSold(row.row.original)}}>Sold</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
    ),
  },
]




export const PuppiesColumn = [
  {
    Header: 'Puppies',
    accessor: 'displayId',
  },
  {
    Header: 'Booking Status',
    accessor:'bookedStatus'
  },
  {
    Header: 'Quality',
    accessor:'breedQuality'
  },
  {
    Header: 'Color',
    accessor: 'color',
  },
  {
    Header: 'Action',
    Cell: (row) => {
      const [inputForm, setForm] = useState(false)
    
      const editPuppies = (row) => {

        const id = row
      
        console.log(id)     

        setForm(false)
      }

      return (
        <>
          <div className={`${styles.Btn}`}>
            <span
              className={`${styles.editBtn}`}
              onClick={(e) => setForm(true)}
            >
              <FiIcons.FiEdit />
            </span>
          </div>
          <Modal show={inputForm}>
            <Modal.Header>
              <Modal.Title>Edit Puppies Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                  <Form.Label className='inline'>
                    Stambum History:
                  </Form.Label>
                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Male"
                          type={type}
                          value="true"
                          id={`inline-${type}-1`}
                       
                        />
                        <Form.Check
                          inline
                          label="Female"
                          type={type}
                          value="false"
                          id={`inline-${type}-2`}
                       
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
                          label="Male"
                          type={type}
                          value="true"
                          id={`inline-${type}-1`}
                       
                        />
                        <Form.Check
                          inline
                          label="Female"
                          type={type}
                          value="false"
                          id={`inline-${type}-2`}
                       
                        />
                      </div>
                    ))}
              </Form>
              <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Image Url"
                      aria-label="Image Url"
                      aria-describedby="basic-addon1"
                      
                    />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e) => editPuppies(row.row.original)} >
                  Submit
                </Button>
                <Button variant="primary" onClick={() => setForm(false)} >
                  Close
                </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    }
  }
]

export const DashData = [
  {
    title: 'Users',
    path: '/dashboard',
    cName: 'nav-text',
  },
  {
    title: 'Puppies',
    path: '/dashboard/puppies-list',
    cName: 'nav-text',
  },
  {
    title: 'Booking List',
    path: '/dashboard/booking-list',
    cName: 'nav-text',
  },
]


