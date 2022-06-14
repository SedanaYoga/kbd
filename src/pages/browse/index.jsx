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
import { getMaxPages, getPuppiesByPage } from '../../helper/pageHelper'

export default function Browse() {
  const { isLoading, puppies } = useSelector((state) => state.puppies)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const query = router.query
  const [filteredPuppies, setFilteredPuppies] = useState([])
  const puppiesToDisplay = 8
  const [pagination, setPagination] = useState({
    currentPage: 1,
    maxPages: 0,
  })

  useGetPuppies(puppies)

  useEffect(() => {
    if (query.msg === 'bookSuccess') {
      setShowModal(true)
    }
    if (puppies) {
      setPagination({
        ...pagination,
        maxPages: getMaxPages(puppies, puppiesToDisplay),
      })
      const puppiesShown = getPuppiesByPage(
        puppies,
        pagination.currentPage,
        puppiesToDisplay,
      )
      setFilteredPuppies(puppiesShown)
    }
  }, [query.msg, puppies, pagination.currentPage])

  const setPageAndShownPuppies = (page) => {
    setPagination({ ...pagination, currentPage: page })
    setFilteredPuppies(
      getPuppiesByPage(
        filteredPuppies,
        pagination.currentPage,
        puppiesToDisplay,
      ),
    )
  }

  const filterHandler = (sex, color, quality) => {
    const newPuppies = puppies
      .filter((pup) => (sex === '' ? pup : pup.sex === sex))
      .filter((pup) => (color === '' ? pup : pup.color === color))
      .filter((pup) => (quality === '' ? pup : pup.breedQuality === quality))

    setPagination({
      currentPage: 1,
      maxPages: getMaxPages(newPuppies, puppiesToDisplay),
    })
    const puppiesShown = getPuppiesByPage(
      newPuppies,
      pagination.currentPage,
      puppiesToDisplay,
    )
    setFilteredPuppies(puppiesShown)
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
              <Image
                src='/images/check.png'
                alt='check'
                width={121}
                height={121}
              />
              <h3>Thank You</h3>
              <p>For Trusting Us</p>
              <Image
                src='/images/logo.png'
                alt='logo'
                width={60}
                height={60}
                className={styles.logo}
              />
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
          <PaginationComp
            currentPage={pagination.currentPage}
            maxPages={pagination.maxPages}
            setPageAndShownPuppies={setPageAndShownPuppies}
          />
        </div>
      )}
    </>
  )
}

Browse.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
