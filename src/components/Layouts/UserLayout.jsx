import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import styles from '../../styles/layouts/UserLayout.module.scss'
import { store } from '../../redux/store'
import { Provider } from 'react-redux'

const UserLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </Provider>
  )
}

export default UserLayout
