import { useTable } from "react-table/dist/react-table.development"
import styles from './component/Table.module.scss'
import { Button, Container, Table } from "react-bootstrap"
import React, {useState, useMemo} from "react"
import { Column } from "./component/TableData.component"
import dataUser from "./static/userdata.json"

export const Users = () => {
    // const [inputform, setForm] = useState(false);

    const columns = useMemo(() => Column, [])
    const data = useMemo(() => dataUser, [])

    const TableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow
    } = TableInstance


    return (
        <>
        {/* <Button variant='secondary' size='lg' className={styles.createUserBtn} onClick={() => setForm(true)}>
          +Add User
        </Button> */}
        {/* <InputUser show={inputform} onHide={() => setForm(false)}/> */}
        {/* <Admin/> */}
        <Container>
            
            <div className={`${styles.tableTitle}`}>
                <h5>Standar User</h5>
                <p>Standar user can only view and edit their user</p>
            </div>
            <Table striped bordered hover {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroups => (
                        <tr {...headerGroups.getHeaderGroupProps()}>
                            {
                                headerGroups.headers.map((columns) => (
                                    <th {...columns.getHeaderProps()}>{columns.render('Header')}</th>
                                ))
                            }
                        </tr>
                    ))
                }   
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}  
                            </tr>
                        )
                    })
                }
            </tbody>
            </Table>
            
            {/*Ini dihilangin nanti ketika masuk production*/}
        </Container>
       </>

    )
}