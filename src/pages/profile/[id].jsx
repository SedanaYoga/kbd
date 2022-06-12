import Head from 'next/head'
import { Container } from 'react-bootstrap'
import styles from '../../styles/pages/ProfilePage.module.scss'
import UserLayout from '../../components/Layouts/UserLayout'
import BtnComp from '../../components/BtnComp/BtnComp'
import BiodataComp from '../../components/BiodataComp/BiodataComp'
import BookingsComp from '../../components/BookingsComp/BookingsComp'
import { useEffect, useState } from 'react'
import { getBiodata, updateBiodata } from '../../firebase/firebase.utils'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'

const ProfilePage = () => {
  const [showBooking, setShowBooking] = useState(false)
  const { email, regInput } = parseCookies()
  const router = useRouter()

  const [userBiodata, setUserBiodata] = useState(null)

  const getBiodataHandler = async (email) => {
    const result = await getBiodata(email)
    setUserBiodata(result)
  }

  useEffect(() => {
    getBiodataHandler(email)
    if (regInput) router.replace('/data-capture')
  }, [])

  const openBiodata = () => {
    setShowBooking(false)
  }
  const openBookings = () => {
    setShowBooking(true)
  }

  const updateProfileHandler = async () => {
    console.log('Hello')
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
            {showBooking ? <BookingsComp /> : <BiodataComp
              profileData={userBiodata && userBiodata}
              onSubmit={updateProfileHandler}
            // onUploadPic={onUploadPic}
            // onDeletePic={onDeletePic}
            // setBiodataToParent={biodataInputHandler}
            // deletePrevImage={deletePrevImage}
            />}
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
