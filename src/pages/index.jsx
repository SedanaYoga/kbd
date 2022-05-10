import Head from 'next/head'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import BtnComp from '../components/BtnComp/BtnComp'
import UserLayout from '../components/Layouts/UserLayout'
import styles from '../styles/pages/Home.module.scss'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home - Kinta-Bali Dog</title>
        <meta
          name='description'
          content='Kintamani-Bali Dog adoption platform'
        />
      </Head>
      <>
        <Container className={styles.heroContainer}>
          <Row className='h-100'>
            <Col className='col-lg-6 d-flex flex-row align-items-center justify-content-start'>
              <div>
                <h1>
                  Find Your Forever{' '}
                  <span className='text-primaryDark'>Soulmate</span>
                </h1>
                <p>For adventure seekers, active and lively humans like you.</p>
                <div>
                  <Link href='/browse'>
                    <BtnComp
                      style={{
                        boxShadow: '0px 2px 10px 0px #00000026',
                      }}
                      type='primary'
                      padding='.6rem 3rem'
                      borad='pill'>
                      Meet our Best Puppies!
                    </BtnComp>
                  </Link>
                </div>
              </div>
            </Col>
            <Col className='col-lg-6 d-flex flex-row align-items-center justify-content-start'>
              <div className={styles.heroImage}>
                <div>
                  <img src='/images/hero-images/1.png' alt='hero-1' />
                </div>
                <div>
                  <img src='/images/hero-images/2.png' alt='hero-2' />
                </div>
                <div>
                  <img src='/images/hero-images/3.png' alt='hero-3' />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
