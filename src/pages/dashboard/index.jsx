import UserLayout from '../../components/Layouts/UserLayout'
import DashLayout from '../../components/Layouts/DashLayout'
import Head from 'next/head'
import { Users } from '../../components/Table/users.component'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getDocs, query, where, collection } from 'firebase/firestore'
import { db } from '../../firebase/firebase.init'
import { parseCookies } from 'nookies'

const Dashboard = () => {
  const router = useRouter()
  const { uid } = parseCookies()
  const [users, setUsers] = useState([])

  const checkAdminUser = useCallback(async () => {
    if (!uid) {
      router.replace('/')
    } else {
      const q = query(collection(db, 'users'), where('uid', '==', uid))
      const data = await getDocs(q)
      data.forEach((doc) => {
        if (doc.data().isAdmin === false) {
          return router.replace('/')
        }
        return router.replace('/dashboard')
      })
    }
  }, [])


  useEffect(() => {
    checkAdminUser()
  }, [checkAdminUser])

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users')
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const transformData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const newTransformdata = transformData.map((data) => ({
        ...data,
        createdAt: data.createdAt.toDate().toString().slice(0, 25),
        lastLoginAt: data.lastLoginAt.toDate().toString().slice(0, 25)
      }));
      setUsers(newTransformdata);
    }

    getUsers()
  }, []);


  return (
    <>
      <Head>
        <title>Dashboard - admin</title>
        <meta name='description' content='dashboard admin' />
      </Head>
      <Users users={users} />
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
