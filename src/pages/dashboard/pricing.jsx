import UserLayout from "../../components/Layouts/UserLayout"
import DashLayout from "../../components/Layouts/DashLayout"
import  Head  from 'next/head'
import DashTable from "../../components/Table/Table.component"
import { useRouter } from 'next/router'
import { Booking } from "../../components/Table/bookinglist.component"
import { InputPricing } from "../../components/Table/pricing.component"

const dashboard = () => {

    return (
        <>
        <Head>
            <title>Pricing</title>
            <meta name='description' content="dashboard admin"/>
        </Head>
        <InputPricing/>
        
        </>
    )
    
}

export default dashboard

dashboard.getLayout = function getLayout(page) {
    return <UserLayout><DashLayout/>{page}</UserLayout>
}