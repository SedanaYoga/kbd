import Head from 'next/head'
import { Container } from 'react-bootstrap'
// import Link from 'next/link'
import UserLayout from '../../components/Layouts/UserLayout'
import styles from '../../styles/pages/Browse.module.scss'
import { useState, useEffect } from 'react'
import { getPuppiesData } from '../../firebase/firebase.utils'
import { BsChevronDown } from 'react-icons/bs'
import PuppyGrid from '../../components/PuppyGrid/PuppyGrid'

export default function Browse() {
  const [puppies, setPuppies] = useState([])

  useEffect(() => {
    const setPuppiesData = async () => {
      const result = await getPuppiesData()
      console.log(result)
      setPuppies(result)
    }
    setPuppiesData()
  }, [])

  return (
    <div>
      <Head>
        <title>Browse Puppy - Kinta-Bali Dog</title>
        <meta
          name='description'
          content='Browse puppy - select puppies Kinta-Bali Dog Site'
        />
      </Head>
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
  )
}

Browse.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
