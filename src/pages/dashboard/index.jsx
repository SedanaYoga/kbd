import UserLayout from '../../components/Layouts/UserLayout'
import DashLayout from '../../components/Layouts/DashLayout'
import Head from 'next/head'
import { Users } from '../../components/Table/users.component'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, login } from '../../redux/slices/userSlice'
import { onIdTokenChanged, signOut } from 'firebase/auth'
// import { auth } from 'firebase-admin'

const dashboard = () => {

  
  
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
