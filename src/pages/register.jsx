import Head from 'next/head'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import UserLayout from '../components/Layouts/UserLayout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { getBiodata, signUpInWithGoogle } from '../firebase/firebase.utils'
import { GoogleIcon } from '../helper/authHelper'
import { setRegInput } from '../redux/slices/registerSlice'
import BtnComp from '../components/BtnComp/BtnComp'
import InputComp from '../components/InputComp/InputComp'
import { notifHandler } from '../helper/errorHelper'
import {
  setGoogleDataToFirestore,
  signUpWithEmailAndPassword,
} from '../firebase/firebase.utils'
import nookies, { setCookie } from 'nookies'

export default function Register(ctx) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const cookies = nookies.get(ctx)

  useEffect(() => {
    if (cookies.regInput) router.replace('/data-capture')
    if (user) router.replace('/')
  }, [])

  const handleChange = (name, value) => {
    setInput({ ...input, [name]: value })
  }

  const submitHandler = async () => {
    if (!input.email || !input.password || !input.confirmPassword) {
      notifHandler(dispatch, 'Please fullfill all required register form')
    } else {
      if (input.password !== input.confirmPassword) {
        notifHandler(dispatch, 'Password does not match')
      } else {
        dispatch(setRegInput(input.email))

        const result = await signUpWithEmailAndPassword(input)

        if (result.error) {
          notifHandler(dispatch, result.error)
        } else {
          setCookie(undefined, 'regInput', input.email)
          dispatch(setRegInput(result.email))
          router.push('/data-capture')
        }
      }
    }

    dispatch(setRegInput(input))
    router.push('/data-capture')
  }

  const signUpWithGoogleHandler = async () => {
    // Sign Up First
    const result = await signUpInWithGoogle()

    // Check if there is any error
    if (result.hasOwnProperty('error')) {
      notifHandler(dispatch, result.error, 'error')
    } else {
      // If not, set Register Input in Redux with Email from the result
      // can ignore password

      const biodata = await getBiodata(result.email)

      setCookie(undefined, 'regInput', result.email)
      dispatch(setRegInput(result.email))

      if (!biodata) setGoogleDataToFirestore(result)

      router.push('/data-capture')
    }
  }

  return (
    <div>
      <Head>
        <title>Register - Kinta-Bali Dog</title>
        <meta
          name='description'
          content='Register page for Kinta-Bali Dog Site'
        />
      </Head>

      <Container className='full-with-footer'>
        <div className='pt-5'>
          <h2>Create New Account</h2>
          <p>
            Already a member?{' '}
            <span>
              <Link href='/login'>
                <span
                  className='d-inline text-decoration-none text-button fw-semibold'
                  role='button'
                >
                  Log in
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
              <InputComp
                label='Confirm Password'
                setNameValue={handleChange}
                name='confirmPassword'
                type='password'
              />
            </div>

            <div>
              <BtnComp
                borad='pill'
                onClick={submitHandler}
                type='primary'
                margin='0 1rem 0 0'
              >
                Sign Up, FREE!
              </BtnComp>
              <BtnComp
                onClick={signUpWithGoogleHandler}
                borad='pill'
                type='secondary'
              >
                <GoogleIcon /> Sign Up with Google
              </BtnComp>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

Register.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
