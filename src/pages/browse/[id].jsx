import Head from 'next/head'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import UserLayout from '../../components/Layouts/UserLayout'

export default function Puppy() {
  return (
    <div>
      <Head>
        <title>Puppy Page - Kinta-Bali Dog</title>
        <meta
          name='description'
          content='Puppy page - puppy detail and booking Kinta-Bali Dog Site'
        />
      </Head>
      <Container className='full-with-footer'>
        <Row className='mt-5'>
          <Col>
            <div>
              <img src='/images/kin-browse/kin-1.jpg' alt='charlie' />
            </div>
          </Col>
          <Col>
            <div>
              <h1 className='border-bottom'>PW06052022M</h1>
              <p>3 months</p>
            </div>
            <div className='detailPuppyCard row row-cols-3 '>
              <div className='col'>
                <div className='shadow-sm'>
                  <p>Vaccinated</p>
                  <h2> ✅ </h2>
                </div>
              </div>
              <div className='col'>
                <div className='shadow-sm'>
                  <p>Stambum</p>
                  <h2> ✅ </h2>
                </div>
              </div>
              <div className='col'>
                <div className='shadow-sm'>
                  <p>DoB</p>
                  <p className='fw-semibold w-100 text-center'>
                    12 January 2022
                  </p>
                </div>
              </div>
              <div className='col'>
                <div className='shadow-sm'>
                  <p>Coat Color</p>
                  <p className='fw-semibold w-100 text-center'>White</p>
                </div>
              </div>
              <div className='col'>
                <div className='shadow-sm'>
                  <p>Breed Quality</p>
                  <p className='fw-semibold w-100 text-center'>Premium</p>
                </div>
              </div>
            </div>
            {/* {puppy?.bookedStatus === 'available' ? ( */}
            <Link href={`/book/123`} className='mt-4'>
              <Button variant='dark' className='w-50'>
                Book for appointment
              </Button>
            </Link>
            {/* ) : userState?.user?.email && */}
            {/*   bookedState?.booked?.id_puppy === puppy?.id && */}
            {/*   bookedState?.booked.requester_email === userState?.user.email ? ( */}
            {/* <div className='mt-4'> */}
            {/*   <Button className='w-50' variant='dark' disabled> */}
            {/*     You Booked This Puppy */}
            {/*   </Button> */}
            {/*   <p className='mt-2 text-button'> */}
            {/*     How come you forget 😆, you've already booked this puppy. Please */}
            {/*     check your booking history. */}
            {/*   </p> */}
            {/* </div> */}
            {/* ) : ( */}
            {/*   <div className='mt-4'> */}
            {/*     <Button className='w-50' variant='dark' disabled> */}
            {/*       Booked */}
            {/*     </Button> */}
            {/*     <p className='mt-2 text-button'> */}
            {/*       Ouch, the puppy has been booked, but not sold yet, please */}
            {/*       comeback later */}
            {/*     </p> */}
            {/*   </div> */}
            {/* {/* )} */}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

Puppy.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
