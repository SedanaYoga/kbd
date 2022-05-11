import Head from 'next/head'
import { Button, Container, Form } from 'react-bootstrap'
import Link from 'next/link'
import UserLayout from '../components/Layouts/UserLayout'
import { useState } from 'react'

export default function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const handleChange = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // // login with email and password
    // const result = await loginWithEmailAndPassword(input.email, input.password)
    // if (result.error) {
    //   console.log(result.error)
    // } else {
    //   // Code for logging lastLoginAt to the firestore
    //   await setLastLoginAt(result.email)
    // }
  }

  return (
    <div>
      <Head>
        <title>Login - Kinta-Bali Dog</title>
        <meta name='description' content='Login page for Kinta-Bali Dog Site' />
      </Head>
      <Container className='full-with-footer'>
        <div className='pt-5'>
          <h2>Login to Your Account</h2>
          <p>
            Not a member?{' '}
            <span>
              <Link href='/register'>
                <span
                  className='d-inline text-decoration-none text-button fw-semibold'
                  role='button'>
                  Register
                </span>
              </Link>
            </span>
          </p>
          <Form className='mb-5 formContainer' onSubmit={handleSubmit}>
            <Form.Group className='formGroup mb-4 pe-5'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' name='email' onChange={handleChange} />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant='dark' className='me-3' type='submit'>
              Submit
            </Button>
            <Button className='text-white' variant='google' type='button'>
              Sign In With Google
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  )
}

Login.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
