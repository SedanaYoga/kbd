import Head from 'next/head'
import { Container } from 'react-bootstrap'
import styles from '../../styles/pages/DataCapture.module.scss'
import UserLayout from '../../components/Layouts/UserLayout'
import BiodataComp from '../../components/BiodataComp/BiodataComp'

const ProfilePage = () => {
  return (
    <div>
      <Head>
        <title>User Data Capture - Kinta-Bali Dog</title>
        <meta
          name='description'
          content='User Data Capture - Kinta-Dog Bali adoption platform'
        />
      </Head>

      <section className='full-with-footer'>
        <Container>
          <div className={styles.capture}>
            <h1 className={styles.captureTitle}>
              More about yourself, <span>please</span>
            </h1>
            <BiodataComp type='data-capture' />
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
