import Head from 'next/head'
import { Container } from 'react-bootstrap'
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
import { GoogleIcon } from '../helper/authHelper'
import InputComp from '../components/InputComp/InputComp'
import BtnComp from '../components/BtnComp/BtnComp'
import { notifHandler } from '../helper/errorHelper'

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (user) router.replace('/')
  }, [])

  const handleChange = (name, value) => {
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // login with email and password
    const result = await loginWithEmailAndPassword(input.email, input.password)
    if (result.error) {
      notifHandler(dispatch, result.error, 'error')
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
      notifHandler(dispatch, result.error, 'error')
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

          <div className='formContainer'>
            <div className='d-flex flex-column justify-content-center gap-3 mb-4'>
              <InputComp
                label='Email'
                setNameValue={handleChange}
                name='email'
                type='email'
              />
              <InputComp
                label='Password'
                setNameValue={handleChange}
                name='password'
                type='password'
              />
            </div>

            <div>
              <BtnComp
                borad='pill'
                onClick={handleSubmit}
                type='primary'
                margin='0 1rem 0 0'>
                Sign In
              </BtnComp>
              <BtnComp
                onClick={handleLoginWithGoogle}
                borad='pill'
                type='secondary'>
                <GoogleIcon /> Sign In With Google
              </BtnComp>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

Login.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
