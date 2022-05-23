import Head from 'next/head'
import { Button, Container, Form } from 'react-bootstrap'
import Link from 'next/link'
import UserLayout from '../components/Layouts/UserLayout'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/slices/userSlice'
import {
  loginWithEmailAndPassword,
  setLastLoginAt,
  signUpInWithGoogle,
} from '../firebase/firebase.utils'
import { useRouter } from 'next/router'
import { woFirebaseWord, woFirebaseWordGoogle } from '../helper/authHelper'
import Notif from '../components/Notif/Notif.component'

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector((state) => state.user)
  const [loginError, setLoginError] = useState('')

  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (user) router.replace('/')
  }, [])

  const handleChange = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // login with email and password
    const result = await loginWithEmailAndPassword(input.email, input.password)
    if (result.error) {
      console.log(result.error)
      setLoginError(woFirebaseWord(result.error))
    } else {
      // Code for logging lastLoginAt to the firestore
      await setLastLoginAt(result.email)
      dispatch(login(result))
      router.push('/')
    }
  }

  const handleLoginWithGoogle = async () => {
    const result = await signUpInWithGoogle()
    if (result.hasOwnProperty('error')) {
      setLoginError(woFirebaseWordGoogle(result.error))
    } else {
      dispatch(login(result))
      router.push('/')
    }
  }

  return (
    <div>
      <Head>
        <title>Login - Kinta-Bali Dog</title>
        <meta name='description' content='Login page for Kinta-Bali Dog Site' />
      </Head>
      <Container className='full-with-footer'>
        {loginError !== '' && <Notif message={loginError} />}
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
            <Button
              onClick={handleLoginWithGoogle}
              className='text-white'
              variant='google'
              type='button'>
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
