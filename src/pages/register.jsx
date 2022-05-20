import Head from 'next/head'
import { Button, Container, Form } from 'react-bootstrap'
import Link from 'next/link'
import UserLayout from '../components/Layouts/UserLayout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { signUpWithEmailAndPassword } from '../firebase/firebase.utils'
import { woFirebaseWord } from '../helper/authHelper'
import Notif from '../components/Notif/Notif.component'
import { login } from '../redux/slices/userSlice';

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector((state) => state.user)
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  })
  const [registerError, setRegisterError] = useState('')

  useEffect(() => {
    if(user) router.replace('/')
  })

  const handleChange = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (input.password !== input.confirmPassword) {
      setRegisterError('Password does not match')
    } else {
      const result = await signUpWithEmailAndPassword(input)
      if (result.error) {
        setRegisterError(woFirebaseWord(result.error))
      } else {
        console.log(result)
        setRegisterError('')
        dispatch(login(result))
        router.push('/')
      }
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
          <Form className='formContainer mb-5' onSubmit={submitHandler}>
            <div className='d-flex flex-row justify-content-between'>
              <Form.Group className='formGroup'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  name='firstName'
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className='formGroup'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  name='lastName'
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <Form.Group className='formGroup'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  name='username'
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className='formGroup'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <Form.Group className='formGroup mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                onChange={handleChange}
              />
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name='confirmPassword'
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant='button' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  )
}

Register.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}
