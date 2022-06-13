import UserLayout from "../../components/Layouts/UserLayout"
import DashLayout from "../../components/Layouts/DashLayout"
import Head from 'next/head'
import DashTable from "../../components/Table/Table.component"
import { useRouter } from 'next/router'
import { Puppies } from "../../components/Table/puppies.component"

const dashboard = () => {
  return (
    <>
      <Head>
        <title>Booking List</title>
        <meta name='description' content="dashboard admin" />
      </Head>
      <Puppies />

    </>
  )

}

export default dashboard

dashboard.getLayout = function getLayout(page) {
  return <UserLayout><DashLayout />{page}</UserLayout>
}
