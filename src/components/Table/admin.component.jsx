import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table/dist/react-table.development'
import { AdminColumn } from './component/TableData.component'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import styles from './component/Table.module.scss'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase.init'

export const Admin = () => {
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, 'users')

  useEffect(() => {
    const getUsers = async () => {
      const queryData = query(usersCollectionRef, where('isAdmin', '==', true))
      const data = await getDocs(queryData)
      const transformData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      const newTransformdata = transformData.map((data) => ({
        ...data,
        createdAt: data.createdAt.toDate().toString().slice(0, 25),
        lastLoginAt: data.lastLoginAt.toDate().toString().slice(0, 25),
      }))
      setUsers(newTransformdata)
      // console.log(newTransformdata)
    }

    getUsers()
  }, [usersCollectionRef])

  const columns = useMemo(() => AdminColumn, [])
  const data = useMemo(() => users, [users])

  const TableInstance = useTable({
    columns,
    data,
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    TableInstance

  return (
    <Container>
      <div className={`${styles.tableTitle}`}>
        <h5>Admin User</h5>
        <p>Admin can add and remove user also manage puppies data</p>
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
                {row.cells.map((cell, i) => {
                  return (
                    <td key={i} {...cell.getCellProps()}>
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
  )
}
