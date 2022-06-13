import Head from 'next/head'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import UserLayout from '../../components/Layouts/UserLayout'
import styles from '../../styles/pages/AboutUs.module.scss'

export default function AboutUs() {
  return (
    <div>
      <Head>
        <title>About Us - Kinta-Bali Dog</title>
        <meta
          name='description'
          content='About us - more about Kinta-Bali Dog Site'
        />
      </Head>

      <div className={styles.aboutus}>
        <Container>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <p>Woof...</p>
              <h1>
                About Our <span>Kennel</span>
              </h1>
              <p>
                Hello to introduce, we are Kintamani Kennel,
                <span>home of quality Kintamani dog breeds.</span>
              </p>
            </div>
          </section>
          <section className={styles.kennel}>
            <Row xs={2} bsPrefix='row g-0'>
              <Col className={styles.kennelImage}>
                <Image src='/images/bg/back-4.png' alt='A Loving Kennel Image' layout='fill' />
              </Col>
              <Col className={styles.kennelInfo}>
                <h1>
                  A <span>Loving</span> Kennel 🐶
                </h1>
                <p>
                  The Kintamani is an ancient breed of landrace dog that
                  developed on the streets of Bali. Many of these dogs remain
                  feral but they tend to be quite amicable towards humans and
                  are often brought into the home as family pets and as
                  watchdogs. They are extremely territorial and don’t generally
                  get along with other dogs or other animals, but they are also
                  extremely devoted and can display intense loyalty towards
                  their chosen owner. While these dogs make excellent watchdogs,
                  they are often too vocal and energetic to make appropriate
                  roommates in a small home or apartment type setting.
                </p>
              </Col>
            </Row>
          </section>
        </Container>
      </div>
    </div>
  )
}

AboutUs.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
