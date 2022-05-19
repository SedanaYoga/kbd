import Head from 'next/head'
import { Container } from 'react-bootstrap'
import styles from '../../styles/pages/ProfilePage.module.scss'
import UserLayout from '../../components/Layouts/UserLayout'

const ProfilePage = () => {
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
              Here's <span>your profile ❤️ </span>
            </h1>

            <div className={styles.profileSubPage}>
              <div>Biodata</div>
              <div>Bookings</div>
            </div>

            <div className={styles.profilePic}>
              <div className={styles.profilePicLeft}>
                <img src='/images/user.png' alt='profile-photo' />
              </div>
              <div className={styles.profilePicRight}>
                <h3>Profile Picture</h3>
                <p>This will be displayed on your profile</p>
                <div className={styles.profilePicRightButtons}>
                  <button>Upload</button>
                  <button>Delete</button>
                </div>
              </div>
            </div>

            <div className={styles.profileData}>
              <div className={styles.profileDataName}>
                <input type='text' value='Sedana' name='firstName' />
                <input type='text' value='Yoga' name='lastName' />
              </div>
              <input type='text' value='+6281335751213' name='phoneNumber' />
              <input
                type='text'
                value='Jalan Akasia XIII No. 6, Denpasar, Bali'
                name='address'
              />
            </div>

            <button>Update</button>
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
