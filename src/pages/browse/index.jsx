import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import UserLayout from '../../components/Layouts/UserLayout'

export default function Browse() {
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
        <div>
          <h1 className='w-100 mt-3 text-center fw-bold'>All Puppies</h1>
          <Row className=' mt-3'>
            <Col className='col-lg-3 col-12 mb-3 border'>This is a Filter</Col>
            <Col className='col-lg-9 col-12 mb-3 ps-4'>
              <div className='row row-cols-3 '>
                {/* <div className='col' key='123'> */}
                <div className='col'>
                  <Link href='/browse/123'>
                    <div className=' mb-3 cardPuppy bg-light shadow-sm p-3 d-flex flex-column justify-content-center align-items-center'>
                      <div className='puppyImageBrowse d-flex justify-content-center align-items-center bg-dark rounded-pill overflow-hidden'>
                        <img
                          src='images/kin-browse/kin-1.jpg'
                          height={200}
                          alt='Charly'
                        />
                      </div>
                      <h3>Male</h3>
                      <p className='text-center'>Male</p>
                      <p className='text-center'>6 Mei 2022</p>
                    </div>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

Browse.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
