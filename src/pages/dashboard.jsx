import UserLayout from "../components/Layouts/UserLayout"
import DashLayout from "../components/Layouts/DashLayout"
import  Head  from 'next/head'
import { Users } from "../components/Table/users.component"


const dashboard = () => {
    return (
        <>
        <Head>
            <title>Dashboard - admin</title>
            <meta name='description' content="dashboard admin"/>
        </Head>
        <Users/>
        </>
    )
    
}

export default dashboard

dashboard.getLayout = function getLayout(page) {
    return <UserLayout><DashLayout/>{page}</UserLayout>
}
