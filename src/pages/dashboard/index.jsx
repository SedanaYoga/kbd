import UserLayout from '../../components/Layouts/UserLayout'
import DashLayout from '../../components/Layouts/DashLayout'
import Head from 'next/head'
import { Users } from '../../components/Table/users.component'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { capitalizeFirst } from '../../helper/textHelper'
import { useDispatch, useSelector } from 'react-redux'
import { logout, login } from '../../redux/slices/userSlice'
import { onIdTokenChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase.init'
import { getDocs, query, where, collection, getDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebase.init'
import { async } from '@firebase/util'

const dashboard = () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [setData, setNewData] = useState('')
 
  useEffect(() => {
    const getUser =  async () => {
      const user = auth.currentUser
      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      const data = await getDocs(q)

      data.forEach((doc) => {

        if(doc.data().isAdmin === false){
          return router.push('/')
        } return router.push('/dashboard')
      })
    }

    

    getUser(user)
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

export default dashboard

dashboard.getLayout = function getLayout(page) {
  return (
    <UserLayout>
      <DashLayout />
      {page}
    </UserLayout>
  )
}
