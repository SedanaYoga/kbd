import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table/dist/react-table.development'
import { BookingColumn } from './component/TableData.component'
import { Container, Table } from 'react-bootstrap'
import styles from './component/Table.module.scss'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase.init'

export const Booking = () => {
  const [booking, setBooking] = useState([])
  const bookingCollectionRef = collection(db, 'booked')

  useEffect(() => {
    const getBooking = async () => {
      const data = await getDocs(bookingCollectionRef)
      const transformData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      const newTransformdata = transformData.map((data) => ({
        ...data,
        apptTime: data.apptTime.toDate().toString().slice(0, 25),
      }))
      setBooking(newTransformdata)
      // console.log(newTransformdata)
    }

    getBooking()
  }, [])

  const columns = useMemo(() => BookingColumn, [])
  const data = useMemo(() => booking, [booking])

  const TableInstance = useTable({
    columns,
    data,
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    TableInstance

  return (
    <>
      <Container>
        <div className={`${styles.tableTitle}`}>
          <h5>Booking List</h5>
          <p>Booking List show people who booked puppies</p>
        </div>
        <Table striped bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroups, i) => (
              <tr key={i} {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((columns, j) => (
                  <th key={j} {...columns.getHeaderProps()}>
                    {columns.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, j) => {
                    return (
                      <td key={j} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </>
  )
}
