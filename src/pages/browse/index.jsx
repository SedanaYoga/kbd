import Head from 'next/head'
import { Container } from 'react-bootstrap'
import UserLayout from '../../components/Layouts/UserLayout'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import styles from '../../styles/pages/Browse.module.scss'
import { BsChevronDown } from 'react-icons/bs'
import PuppyGrid from '../../components/PuppyGrid/PuppyGrid'
import Modal from '../../components/Modal/Modal'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import useGetPuppies from '../../hooks/useGetPuppies'

export default function Browse() {
  const { isLoading, puppies } = useSelector((state) => state.puppies)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const query = router.query

  useGetPuppies(puppies)

  useEffect(() => {
    if (query.msg === 'bookSuccess') {
      setShowModal(true)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Head>
            <title>Browse Puppy - Kinta-Bali Dog</title>
            <meta
              name='description'
              content='Browse puppy - select puppies Kinta-Bali Dog Site'
            />
          </Head>
          <Modal
            show={showModal}
            onClose={() => {
              setShowModal(false)
              router.push('/browse')
            }}
          >
            <div className={styles.modalBody}>
              <h1>Your book has successfully recorded!</h1>
              <img src='/images/check.png' alt='check' />
              <h3>Thank You</h3>
              <p>For Trusting Us</p>
              <img src='/images/logo.png' alt='logo' className={styles.logo} />
            </div>
          </Modal>
          <Container className='full-with-footer'>
            <section className={styles.browse}>
              <h1>All Puppies</h1>

              <div className={styles.browseFilter}>
                <div className={styles.browseFilterSex}>
                  <div className={styles.browseFilterSexMale}>Male</div>
                  <div className={styles.browseFilterSexFemale}>Female</div>
                </div>
                <div className={styles.browseFilterAge}>
                  All Age <BsChevronDown />{' '}
                </div>
                <div className={styles.browseFilterColor}>
                  <div className={styles.browseFilterColorWhite}>
                    <span></span> White
                  </div>
                  <div className={styles.browseFilterColorBlack}>
                    <span></span> Black
                  </div>
                  <div className={styles.browseFilterColorBrown}>
                    <span></span> Brown
                  </div>
                  <div className={styles.browseFilterColorBridle}>
                    <span></span> Bridle
                  </div>
                </div>
              </div>

              <div className={styles.browsePuppies}>
                <PuppyGrid puppies={puppies} />
              </div>
            </section>
          </Container>
        </div>
      )}
    </>
  )
}

Browse.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
