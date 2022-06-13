import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table/dist/react-table.development'
import { PuppiesColumn } from './component/TableData.component'
import { Container, Table, Button } from 'react-bootstrap'
import styles from './component/Table.module.scss'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase.init'
import { InputPuppies } from './component/InputPuppies.component'
import BtnComp from '../BtnComp/BtnComp'

export const Puppies = () => {
  const puppiesCollectionRef = collection(db, 'puppies')
  const [puppies, setPuppies] = useState([])
  const [inputform, setForm] = useState(false)

  const getPuppies = async () => {
    const data = await getDocs(puppiesCollectionRef)
    const transformData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    const newTransformdata = transformData.map((data) => ({
      ...data,
    }))
    setPuppies(newTransformdata)
  }
  useEffect(() => {
    getPuppies()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const updatePuppyHandler = (puppyObject) => {
    setPuppies([...puppies, puppyObject])
  }

  const columns = useMemo(() => PuppiesColumn, [])
  const data = useMemo(() => puppies, [puppies])

  const TableInstance = useTable({
    columns,
    data,
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    TableInstance

  return (
    <>
      <BtnComp style={{
        position: 'absolute',
        top: '15vh',
        right: '25vw'
      }} type='primary' onClick={() => setForm(true)}>+ Add Puppy</BtnComp>
      <InputPuppies updatePuppy={updatePuppyHandler} show={inputform} onHide={() => setForm(false)} />
      <Container>
        <div className={`${styles.tableTitle}`}>
          <h5>Puppies</h5>
          <p>Puppies displayed in the portal</p>
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
