import React, { useState, useEffect } from 'react'
import { query, where, doc, deleteDoc, updateDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase/firebase.init'
import * as MdIcons from 'react-icons/md'
import * as FiIcons from 'react-icons/fi'
import styles from './Table.module.scss'
import {
  Dropdown,
  Modal,
  InputGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap'
import { bookIdToPuppyIdAndEmail } from '../../../helper/textHelper'

export const AdminColumn = [
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
]

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
    Cell: (row) => {
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
        window.location.reload(false)
      }

      return (
        <div className={`${styles.Btn}`}>
          <span
            className={`${styles.deleteBtn}`}
            onClick={(e) => deleteUser(row.row.original)}>
            <MdIcons.MdDeleteForever />
          </span>
          <span
            className={`${styles.editBtn}`}
            onClick={(e) => updateAdmin(row.row.original)}>
            <FiIcons.FiEdit />
          </span>
        </div>
      )
    },
  },
]

const updatePuppyStatus = async (bookId, bookedStatus) => {
  const { puppyId } = bookIdToPuppyIdAndEmail(bookId)
  // Find puppy with puppyId
  const puppyDoc = doc(db, 'puppies', puppyId)
  await updateDoc(puppyDoc, { bookedStatus })
}

const updateCancel = async (row) => {
  const id = row.id

  await updatePuppyStatus(id, 'available')

  const userDoc = doc(db, 'booked', id)

  const newField = { status: 'canceled' }
  await updateDoc(userDoc, newField)
  console.log(newField)
  window.location.reload()
}

const updateApprove = async (row) => {
  const id = row.id

  await updatePuppyStatus(id, 'approved')

  // Update puppy bookedStatus to approved
  const userDoc = doc(db, 'booked', id)

  const newField = { status: 'approved' }
  await updateDoc(userDoc, newField)
  console.log(newField)
  window.location.reload()
}

const updatePending = async (row) => {
  const id = row.id
  await updatePuppyStatus(id, 'available')
  const userDoc = doc(db, 'booked', id)


  const newField = { status: 'pending' }
  await updateDoc(userDoc, newField)
  console.log(newField)
  window.location.reload()
}

const updateDecline = async (row) => {
  const id = row.id
  await updatePuppyStatus(id, 'available')
  const userDoc = doc(db, 'booked', id)

  const newField = { status: 'declined' }
  await updateDoc(userDoc, newField)
  console.log(newField)
  window.location.reload()
}

const updateSold = async (row) => {
  const id = row.id

  await updatePuppyStatus(id, 'sold')

  const userDoc = doc(db, 'booked', id)


  const newField = { status: 'sold' }
  await updateDoc(userDoc, newField)
  console.log(newField)
  window.location.reload()
}

export const BookingColumn = [
  {
    Header: 'Puppies',
    accessor: 'puppyId',
  },
  {
    Header: 'Price',
    accessor: 'adoptPrice',
  },
  {
    Header: 'Appointment',
    accessor: 'apptTime',
  },
  {
    Header: 'Requester',
    accessor: 'requesterEmail',
  },
  {
    Header: 'Status',
    Cell: (row) => (
      <Dropdown>
        <Dropdown.Toggle variant='success' id='dropdown-basic'>
          {`${row.row.original.status}`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(e) => {
              updatePending(row.row.original)
            }}>
            Pending
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              updateApprove(row.row.original)
            }}>
            Approve
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              updateDecline(row.row.original)
            }}>
            Decline
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              updateCancel(row.row.original)
            }}>
            Cancel
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              updateSold(row.row.original)
            }}>
            Sold
          </Dropdown.Item>
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
    accessor: 'bookedStatus',
  },
  {
    Header: 'Quality',
    accessor: 'breedQuality',
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
              onClick={(e) => setForm(true)}>
              <FiIcons.FiEdit />
            </span>
          </div>
          <Modal show={inputForm}>
            <Modal.Header>
              <Modal.Title>Edit Puppies Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder='Image Url'
                  aria-label='Image Url'
                  aria-describedby='basic-addon1'
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='primary'
                onClick={(e) => editPuppies(row.row.original)}>
                Submit
              </Button>
              <Button variant='primary' onClick={() => setForm(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    },
  },
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
  {
    title: 'Pricing',
    path: '/dashboard/pricing',
    cName: 'nav-text',
  },
]
