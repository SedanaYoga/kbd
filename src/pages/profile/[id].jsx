import Head from 'next/head'
import { Container } from 'react-bootstrap'
import styles from '../../styles/pages/ProfilePage.module.scss'
import UserLayout from '../../components/Layouts/UserLayout'
import BtnComp from '../../components/BtnComp/BtnComp'
import BiodataComp from '../../components/BiodataComp/BiodataComp'
import BookingsComp from '../../components/BookingsComp/BookingsComp'
import { useState } from 'react'

const ProfilePage = () => {
  const [showBooking, setShowBooking] = useState(false)
  const openBiodata = () => {
    setShowBooking(false)
  }
  const openBookings = () => {
    setShowBooking(true)
  }
  return (
    <div>
      <Head>
        <title>Profile Page - Kinta-Bali Dog</title>
        <meta
          name='description'
          content='Profile Page - Kinta-Dog Bali adoption platform'
        />
      </Head>

      <section className='full-with-footer'>
        <Container>
          <div className={styles.profile}>
            <h1 className={styles.profileTitle}>
              Here&#39;s <span>your profile ❤️ </span>
            </h1>

            <div className={styles.profileSubPage}>
              <BtnComp
                style={{ borderRight: '1px solid black' }}
                onClick={openBiodata}
                type='link'
                padding='0 1rem'
                borad='none'>
                Biodata
              </BtnComp>
              <BtnComp onClick={openBookings} type='link' padding='0 1rem'>
                Bookings
              </BtnComp>
            </div>
            {showBooking ? <BookingsComp /> : <BiodataComp />}
          </div>
        </Container>
      </section>
    </div>
  )
}

ProfilePage.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}

export default ProfilePage
