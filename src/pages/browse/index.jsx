import Head from 'next/head'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
import UserLayout from '../../components/Layouts/UserLayout'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import styles from '../../styles/pages/Browse.module.scss'
import PuppyGrid from '../../components/PuppyGrid/PuppyGrid'
import Modal from '../../components/Modal/Modal'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import useGetPuppies from '../../hooks/useGetPuppies'
import FilterComp from '../../components/FilterComp/FilterComp'
import PaginationComp from '../../components/PaginationComp/PaginationComp'

export default function Browse() {
  const { isLoading, puppies } = useSelector((state) => state.puppies)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const query = router.query
  const [filteredPuppies, setFilteredPuppies] = useState([])

  useGetPuppies(puppies)

  useEffect(() => {
    if (query.msg === 'bookSuccess') {
      setShowModal(true)
    }
    if (puppies) {
      setFilteredPuppies(puppies)
    }
  }, [query.msg, puppies])

  const filterHandler = (sex, color, quality) => {
    const newPuppies = puppies.filter(pup => sex === '' ? pup : pup.sex === sex).filter(pup => color === '' ? pup : pup.color === color).filter(pup => quality === '' ? pup : pup.breedQuality === quality)
    setFilteredPuppies(newPuppies)
  }

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
              <Image src='/images/check.png' alt='check' width={121} height={121} />
              <h3>Thank You</h3>
              <p>For Trusting Us</p>
              <Image src='/images/logo.png' alt='logo' width={60} height={60} className={styles.logo} />
            </div>
          </Modal>
          <Container className='full-with-footer'>
            <section className={styles.browse}>
              <h1>All Puppies</h1>

              <FilterComp filterHandler={filterHandler} />

              <div className={styles.browsePuppies}>
                <PuppyGrid puppies={filteredPuppies} />
              </div>
            </section>
          </Container>
          <PaginationComp />
        </div>
      )}
    </>
  )
}

Browse.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
