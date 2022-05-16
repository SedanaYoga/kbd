import Head from 'next/head'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import BtnComp from '../components/BtnComp/BtnComp'
import UserLayout from '../components/Layouts/UserLayout'
import styles from '../styles/pages/Home.module.scss'
import SliderComp from '../components/SliderComp/SliderComp'
import PuppyGrid from '../components/PuppyGrid/PuppyGrid'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import testi from '../testiData'
import SliderSwiper from '../components/SliderSwiper/SliderSwiper'
import { useDispatch, useSelector } from 'react-redux'
import { getPuppiesFb } from '../redux/slices/puppiesSlice'
import { useEffect } from 'react'

export default function Home() {
  const { isLoading, puppies } = useSelector((state) => state.puppies)
  const dispatch = useDispatch()

  useEffect(() => {
    if (puppies.length === 0) {
      dispatch(getPuppiesFb())
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
                    I am an ancient landrace breed that thrived on the streets
                    of Bali. I am very territorial, vocal, and energetic. love
                    to run and play. However, I am also very devoted to you, my
                    owner.
                  </p>
                </div>
                <div className={styles.slider}>
                  <SliderComp className={styles.sliderContainer}>
                    {[...Array(4).keys()].map((key) => (
                      <div key={key} className={styles.sliderImage}>
                        <img
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

          <section className={styles.meetPuppies}>
            <Container className={styles.meetPuppiesContainer}>
              <h1>
                Meet Our Cutie <span>Pup 🐶</span>
              </h1>
              <PuppyGrid puppies={puppies} endSlice={8} />
              <div className={styles.meetPuppiesSeeMore}>
                <Link href='/browse'>
                  <a>See more puppies</a>
                </Link>
              </div>
            </Container>
          </section>

          <section className={styles.whyUs}>
            <Container className={styles.whyUsContainer}>
              <h1>Why Us?</h1>
              <Row lg={3} md={1}>
                <Col className={styles.whyUsCard}>
                  <img src='/images/why-us/best-breed.png' alt='best-breed' />
                  <h2>
                    <span>Best</span> Breed
                  </h2>
                </Col>
                <Col className={styles.whyUsCard}>
                  <img src='/images/why-us/stambum.png' alt='stambum' />
                  <h2>
                    <span>Stambum</span> Certificate
                  </h2>
                </Col>
                <Col className={styles.whyUsCard}>
                  <img src='/images/why-us/vaccinated.png' alt='vaccinated' />
                  <h2>
                    Complete <span>Vaccine</span>
                  </h2>
                </Col>
              </Row>
            </Container>
          </section>

          <section className={styles.testi}>
            <Container>
              <h1 className='text-center fw-bold mb-5'>What they say...</h1>
              <SliderSwiper>
                {testi.map(({ comment, imgUrl, name, id, year }) => (
                  <div key={id} className={styles.testiSliderCard}>
                    <h5>{`"${comment}"`}</h5>
                    <div className={styles.testiSliderCardBottom}>
                      <img src={imgUrl} alt={`testi - ${name}`} />
                      <p>{`${name}, ${year}`}</p>
                    </div>
                  </div>
                ))}
              </SliderSwiper>
            </Container>
          </section>
        </div>
      )}
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
