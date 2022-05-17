import React, {useEffect, useMemo, useState} from 'react'
import { useTable } from 'react-table/dist/react-table.development'
import { PuppiesColumn } from './component/TableData.component'
import {Container, Table, Button, Modal} from 'react-bootstrap'
import styles from './component/Table.module.scss'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase.init'
import { InputPuppies } from './component/InputPuppies.component'


export const Puppies = () => {

    const [puppies, setPuppies] = useState([])
    const puppiesCollectionRef = collection(db, "puppies")
    const [inputform, setForm] = useState(false);
    

    useEffect(() => {
        const getPuppies = async () => {
            const data = await getDocs(puppiesCollectionRef);
            const transformData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            const newTransformdata = transformData.map((data) => ({
                ...data,
            }));
            setPuppies(newTransformdata);
        }

        getPuppies()
    }, [])

    const columns = useMemo(() => PuppiesColumn, [])
    const data = useMemo(() => puppies, [puppies])

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
                +Add Puppies
            </Button>
            <InputPuppies show={inputform} onHide={() => setForm(false)}/>
            <Container>
            <div className={`${styles.tableTitle}`}>
                <h5>Puppies</h5>
                <p>Puppies displayed in the portal</p>
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
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}
                                    </td>
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
