import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import UserLayout from '../components/Layouts/UserLayout'

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
      <Container className='heroContainer p-5'>
        <h3 className='text-center'>Woof...</h3>
        <Row>
          <Col className='col-lg-4 col-12 text-lg-start text-center'>
            <h1 style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>About Us</h1>
          </Col>
          <Col className='col-lg-5 col-12 d-flex mt-4 text-lg-start text-center'>
            <p className='text-start'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem
              turpis sed fusce feugiat est nisl, enim lobortis. Eu accumsan
              adipiscing pharetra, ultricies mi neque sodales quam. Pretium, a,
              ultricies integer consequat ornare mus scelerisque arcu proin.
              Eleifend facilisis nulla eu porttitor.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className='w-100 mt-4 d-flex justify-content-lg-end justify-content-center'>
            <img
              className='heroImage'
              src='/images/about_us.png'
              alt='about us'
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

AboutUs.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
