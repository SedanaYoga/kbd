import UserLayout from '../../components/Layouts/UserLayout'
import DashLayout from '../../components/Layouts/DashLayout'
import Head from 'next/head'
import { Users } from '../../components/Table/users.component'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getDocs, query, where, collection } from 'firebase/firestore'
import { db } from '../../firebase/firebase.init'
import { parseCookies } from 'nookies'

const Dashboard = () => {
  const router = useRouter()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const { uid } = parseCookies()

    if (!uid) {
      router.replace('/')
    } else {
      const getUser = async () => {
        const q = query(collection(db, 'users'), where('uid', '==', uid))
        const data = await getDocs(q)
        data.forEach((doc) => {
          if (doc.data().isAdmin === false) {
            return router.replace('/')
          }
          return router.replace('/dashboard')
        })
      }

      getUser(user)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard - admin</title>
        <meta name='description' content='dashboard admin' />
      </Head>
      <Users />
    </>
  )
}

export default Dashboard

Dashboard.getLayout = function getLayout(page) {
  return (
    <UserLayout>
      <DashLayout />
      {page}
    </UserLayout>
  )
}
