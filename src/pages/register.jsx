import Head from 'next/head'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import UserLayout from '../components/Layouts/UserLayout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
// import { signUpWithEmailAndPassword } from '../firebase/firebase.utils'
// import { woFirebaseWord } from '../helper/authHelper'
import Notif from '../components/Notif/Notif.component'
// import { login } from '../redux/slices/userSlice'
import { clearRegInput, setRegInput } from '../redux/slices/registerSlice'
import BtnComp from '../components/BtnComp/BtnComp'
import InputComp from '../components/InputComp/InputComp'

export default function Register() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [registerError, setRegisterError] = useState('')

  useEffect(() => {
    dispatch(clearRegInput())
    if (user) router.replace('/')
  }, [])

  const handleChange = (name, value) => {
    setInput({ ...input, [name]: value })
  }

  const submitHandler = () => {
    if (input.password !== input.confirmPassword) {
      setRegisterError('Password does not match')
    } else {
      dispatch(setRegInput(input))
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
        {registerError !== '' && <Notif message={registerError} />}
        <div className='pt-5'>
          <h2>Create New Account</h2>
          <p>
            Already a member?{' '}
            <span>
              <Link href='/login'>
                <span
                  className='d-inline text-decoration-none text-button fw-semibold'
                  role='button'>
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
                margin='0 1rem 0 0'>
                Sign Up, FREE!
              </BtnComp>
              <BtnComp borad='pill' type='secondary'>
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

function GoogleIcon() {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M22.501 12.2332C22.501 11.3699 22.4296 10.7399 22.2748 10.0865H12.2153V13.9832H18.12C18.001 14.9515 17.3582 16.4099 15.9296 17.3898L15.9096 17.5203L19.0902 19.935L19.3106 19.9565C21.3343 18.1249 22.501 15.4298 22.501 12.2332Z'
        fill='#4285F4'
      />
      <path
        d='M12.2147 22.5C15.1075 22.5 17.5361 21.5666 19.3099 19.9567L15.929 17.3899C15.0242 18.0083 13.8099 18.4399 12.2147 18.4399C9.38142 18.4399 6.97669 16.6083 6.11947 14.0766L5.99382 14.0871L2.68656 16.5954L2.64331 16.7132C4.40519 20.1433 8.02423 22.5 12.2147 22.5Z'
        fill='#34A853'
      />
      <path
        d='M6.11997 14.0767C5.89379 13.4233 5.76289 12.7233 5.76289 12C5.76289 11.2766 5.89379 10.5766 6.10807 9.92331L6.10208 9.78417L2.75337 7.23553L2.64381 7.28661C1.91765 8.70996 1.50098 10.3083 1.50098 12C1.50098 13.6916 1.91765 15.2899 2.64381 16.7133L6.11997 14.0767Z'
        fill='#FBBC05'
      />
      <path
        d='M12.2148 5.55997C14.2267 5.55997 15.5838 6.41163 16.3576 7.12335L19.3814 4.23C17.5243 2.53834 15.1076 1.5 12.2148 1.5C8.02426 1.5 4.4052 3.85665 2.64331 7.28662L6.10759 9.92332C6.97672 7.39166 9.38146 5.55997 12.2148 5.55997Z'
        fill='#EB4335'
      />
    </svg>
  )
}
