import Head from 'next/head'
import { Container } from 'react-bootstrap'
import styles from '../../styles/pages/DataCapture.module.scss'
import UserLayout from '../../components/Layouts/UserLayout'
import BiodataComp from '../../components/BiodataComp/BiodataComp'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signUpWithEmailAndPassword } from '../../firebase/firebase.utils'
// import { woFirebaseWord } from '../../helper/authHelper'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/userSlice'
import { clearRegInput } from '../../redux/slices/registerSlice'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const {
    regInput: { inputUser },
    user: { user },
  } = useSelector((state) => state)
  const [userInput, setUserInput] = useState({
    email: inputUser?.email,
    password: inputUser?.password,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  })
  // const [registerError, setRegisterError] = useState('')

  const router = useRouter()

  const biodataInputHandler = (biodata) => {
    setUserInput({ ...userInput, ...biodata })
  }

  const authSubmitHandler = async () => {
    console.log(userInput)
    const result = await signUpWithEmailAndPassword(userInput)
    if (result.error) {
      // setRegisterError(woFirebaseWord(result.error))
      console.log(result.error)
    } else {
      // setRegisterError('')
      console.log(result)
      dispatch(login(result))
      router.push('/')
    }
    dispatch(clearRegInput())
  }

  useEffect(() => {
    if (inputUser === null) {
      router.push('/')
    }
  }, [])

  return (
    <div>
      <Head>
        <title>User Data Capture - Kinta-Bali Dog</title>
        <meta
          name='description'
          content='User Data Capture - Kinta-Dog Bali adoption platform'
        />
      </Head>

      <section className='full-with-footer'>
        <Container>
          <div className={styles.capture}>
            <h1 className={styles.captureTitle}>
              More about yourself, <span>please</span>
            </h1>
            <BiodataComp
              type='data-capture'
              onSubmit={authSubmitHandler}
              setBiodata={biodataInputHandler}
            />
          </div>
        </Container>
      </section>
    </div>
  )
}

ProfilePage.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}

export default ProfilePage
