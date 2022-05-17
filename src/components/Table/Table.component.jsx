import { DashData  } from "./component/TableData.component";
import { Container } from "react-bootstrap";
import Link from 'next/link'
import styles from './component/Table.module.scss'

export default function DashTable() {
    return (
        <>
            <Container className={styles.pageTitle}>
                <h2>Admin Dashboard</h2>
                <ul className={styles.dashMenuItems}>
                    {DashData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link href={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </Container>
            
        </>
    )
}