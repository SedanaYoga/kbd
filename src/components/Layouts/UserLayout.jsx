import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import styles from '../../styles/layouts/UserLayout.module.scss'
import { store } from '../../redux/store'
import { Provider } from 'react-redux'
import NotifComp from '../../components/NotifComp/NotifComp'
import { IconContext } from 'react-icons'

const UserLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <IconContext.Provider value={{ color: 'black', size: '1rem' }}>
        <div className={styles.container}>
          <Navbar />
          {children}
          <Footer />
          <NotifComp />
        </div>
      </IconContext.Provider>
    </Provider>
  )
}

export default UserLayout
