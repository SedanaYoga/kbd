import React, { useState, useMemo, useEffect } from "react"
import { useTable } from "react-table/dist/react-table.development"
import styles from './component/Table.module.scss'
import { Button, Container, Table } from "react-bootstrap"
import { Column } from "./component/TableData.component"
import { InputUser } from './component/InputUser.component'
import { collection, getDocs } from 'firebase/firestore'
import { Admin } from './admin.component'
import { db } from "../../firebase/firebase.init"

export const Users = ({ users }) => {
  const [inputform, setForm] = useState(false);

  const columns = useMemo(() => Column, [])
  const data = useMemo(() => users, [users])

  const TableInstance = useTable({
    columns,
    data
  })

  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow
  } = TableInstance


  return (
    <>
      <Button variant='dark' size='lg' className={styles.createUserBtn} onClick={() => setForm(true)}>
        +Add User
      </Button>
      <InputUser show={inputform} onHide={() => setForm(false)} />
      <Admin />
      <Container>

        <div className={`${styles.tableTitle}`}>
          <h5>Standar User</h5>
          <p>Standar user can only view and edit their user</p>
        </div>
        <Table striped bordered hover {...getTableProps()}>
          <thead>
            {
              headerGroups.map((headerGroups, i) => (
                <tr key={i} {...headerGroups.getHeaderGroupProps()}>
                  {
                    headerGroups.headers.map((columns, j) => (
                      <th key={j} {...columns.getHeaderProps()}>{columns.render('Header')}</th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, j) => {
                      return <td key={j} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Container>
    </>

  )
}
