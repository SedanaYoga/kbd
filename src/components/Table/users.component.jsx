import React, {useState, useMemo, useEffect} from "react"
import { useTable } from "react-table/dist/react-table.development"
import styles from './component/Table.module.scss'
import { Button, Container, Table } from "react-bootstrap"
import { Column } from "./component/TableData.component"
import { InputUser } from './component/InputUser.component'
import {collection, getDocs} from 'firebase/firestore'
import { Admin } from './admin.component'
import { db } from "../../firebase/firebase.init"

export const Users = () => {
    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, 'users')
    const [inputform, setForm] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            const transformData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            const newTransformdata = transformData.map((data) => ({
                ...data,
                createdAt: data.createdAt.toDate().toString().slice(0, 25),
                lastLoginAt: data.lastLoginAt.toDate().toString().slice(0, 25)
            }));
            setUsers(newTransformdata);
        }

        getUsers()
    }, []);


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
        <Button variant='secondary' size='lg' className={styles.createUserBtn} onClick={() => setForm(true)}>
          +Add User
        </Button>
        <InputUser show={inputform} onHide={() => setForm(false)}/>
        <Admin/> 
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
        </Container>
       </>

    )
}