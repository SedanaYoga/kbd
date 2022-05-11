import Head from 'next/head'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import BtnComp from '../components/BtnComp/BtnComp'
import UserLayout from '../components/Layouts/UserLayout'
import styles from '../styles/pages/Home.module.scss'
import SliderComp from '../components/SliderComp/SliderComp'

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
      <section>
        <Container className={styles.heroContainer}>
          <Row className='h-100 d-flex flex-lg-row flex-column'>
            <Col className='pe-lg-5 col-lg-5 d-flex flex-row flex-grow-1 align-items-center justify-content-start'>
              <div>
                <h1>
                  Find Your Forever{' '}
                  <span className='text-primaryDark'>Soulmate</span>
                </h1>
                <p className='pe-lg-5'>
                  For adventure seekers, active and lively humans like you.
                </p>
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
            <Col className='col-lg-7 d-flex flex-row align-items-center justify-content-start'>
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
      </section>
      <section className={styles.dogSlider}>
        <Container>
          <article>
            <div className={styles.caption}>
              <h1>
                Hi hooman! I’m <span>Kintamani</span> Dogs
              </h1>
              <p>
                I am an ancient landrace breed that thrived on the streets of
                Bali. I am very territorial, vocal, and energetic. love to run
                and play. However, I am also very devoted to you, my owner.
              </p>
            </div>
            <div className={styles.slider}>
              <SliderComp>
                {[...Array(4).keys()].map((key) => (
                  <div className={styles.sliderImage}>
                    <img
                      key={key}
                      src={`/images/meet-dogs/${key + 1}.png`}
                      alt={`dogs-${key + 1}`}
                    />
                  </div>
                ))}
              </SliderComp>
            </div>
          </article>
        </Container>
      </section>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
