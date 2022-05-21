import UserLayout from '../../components/Layouts/UserLayout'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap'
import {
  camelToNormalUpperCase,
  capitalizeFirst,
  strToCurrency,
} from '../../helper/textHelper'
import { useState } from 'react'
import nookies from 'nookies'
import { auth, db } from '../../firebase/firebaseAdmin.init'
import { timeStampToDateString } from '../../helper/dateHelper'

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params
  try {
    // Parse cookies
    const cookies = nookies.get(ctx)
    const token = await auth.verifyIdToken(cookies.token)

    const { uid, email } = token
    const pricingCollectionRef = db.collection('pricing')
    const puppyDocRef = db.collection('puppies').doc(id)

    // Get Pricing
    const pricing = await pricingCollectionRef.get()
    const pricingData = pricing.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      }
    })

    // Get Puppy
    const puppy = await puppyDocRef.get()
    const puppyData = {
      ...puppy.data(),
      dob: timeStampToDateString(puppy.data().dob),
    }
    return {
      props: {
        message: `Your email is ${email} and your UID is ${uid}.`,
        pricing: pricingData,
        puppy: puppyData,
      },
    }
  } catch (err) {
    console.log(err.message)
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return { props: {} }
  }
}

const Book = ({ puppy, pricing }) => {
  const router = useRouter()
  const priceRelatedData = ['breedQuality', 'color']

  const calcTotalPrice = (pricing, puppy) => {
    let totalPrice = 0
    pricing.map((price) => {
      totalPrice += +price[puppy[price.id]]
    })
    return totalPrice
  }

  // Date Input State
  const [input, setInput] = useState({
    appt_date: '',
    appt_time: '',
  })

  const inputChangeHandler = (e) => {
    const value = e.target.value
    const name = e.target.name
    setInput({ ...input, [name]: value })
  }

  const bookingSubmitHandler = async (e) => {
    e.preventDefault()
    console.log('Submitting')
    // const { appt_date, appt_time } = input
    // const valueToSubmit = {
    //   apptTime: new Date(moment(appt_date + ' ' + appt_time)),
    //   adoptPrice: calcTotalPrice(pricing, puppy).toString(),
    //   status: 'pending',
    //   puppyId: puppy.id,
    //   requesterId: 'abc123',
    // }
    // await addBookedData(valueToSubmit)
    router.push({
      pathname: '/browse',
      query: { msg: 'bookSuccess' },
    })
  }

  return (
    <div>
      <Head>
        <title>{`Book ${puppy.displayId} - Kinta-Bali Dog`}</title>
        <meta
          name='description'
          content='Puppy page - puppy detail and booking Kinta-Bali Dog Site'
        />
      </Head>

      <>
        <section className='full-with-footer'>
          <Container className='d-lg-flex justify-content-center align-items-center w-100 full-with-footer'>
            <Row className='w-100 d-lg-flex flex-row justify-content-center align-items-center'>
              <Col>
                <h2>Booking Confirmation</h2>
                <div>
                  <p
                    style={{
                      margin: '1.5rem 0px 0.5rem',
                      paddingBottom: '0.5rem',
                      borderBottom: '1px solid gray',
                    }}>
                    Estimated Adoption Price Tag:{' '}
                    <span className='fw-semibold'>{puppy.displayId}</span>
                  </p>
                  <Table style={{ marginTop: '0px' }}>
                    <tbody>
                      {pricing.map((price, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              paddingLeft: '0px',
                            }}>{`${camelToNormalUpperCase(
                            price.id,
                          )}: ${capitalizeFirst(
                            puppy[priceRelatedData[index]],
                          )}`}</td>
                          <td className='text-end pe-0'>
                            {strToCurrency(
                              price[puppy[priceRelatedData[index]]],
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Table
                    style={{
                      margin: '1rem 0px 0.5rem',
                    }}>
                    <tbody>
                      <tr>
                        <td style={{ paddingLeft: '0px' }}>Total price</td>
                        <td
                          className='text-end'
                          style={{ paddingRight: '0px' }}>
                          {strToCurrency(calcTotalPrice(pricing, puppy))}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col className='h-100 m-4 d-flex justify-content-center'>
                <div className='w-75 bg-light shadow-sm p-5 py-5 d-flex flex-column justify-content-center align-items-center'>
                  <Form onSubmit={bookingSubmitHandler} className='w-100'>
                    <Form.Group className='w-100 d-flex justify-content-between mb-4'>
                      <label>
                        Date{' '}
                        <input
                          className='form-control '
                          type='date'
                          name='appt_date'
                          onChange={inputChangeHandler}
                        />
                      </label>
                      <label>
                        Time{' '}
                        <input
                          className='form-control'
                          type='time'
                          name='appt_time'
                          onChange={inputChangeHandler}
                        />
                      </label>
                    </Form.Group>
                    <Button
                      type='submit'
                      variant='dark'
                      size='lg'
                      className='w-100'>
                      Book for Appointment
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    </div>
  )
}

Book.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
export default Book
