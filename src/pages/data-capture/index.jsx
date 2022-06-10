import Head from 'next/head'
import { Container } from 'react-bootstrap'
import styles from '../../styles/pages/DataCapture.module.scss'
import UserLayout from '../../components/Layouts/UserLayout'
import BiodataComp from '../../components/BiodataComp/BiodataComp'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  setGoogleDataToFirestore,
  signUpWithEmailAndPassword,
  updateBiodata,
} from '../../firebase/firebase.utils'
import { useDispatch } from 'react-redux'
import { logout, setUserState } from '../../redux/slices/userSlice'
import { clearRegInput, setRegInput } from '../../redux/slices/registerSlice'
import { notifHandler } from '../../helper/errorHelper'
import nookies, {setCookie} from 'nookies'

const DataCapturePage = (ctx) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const cookies = nookies.get(ctx)
  
  const {
    regInput: { inputUser: regInput },
  } = useSelector((state) => state)
  
  const [userInput, setUserInput] = useState({
    email: regInput?.email,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  })

  const biodataInputHandler = (biodata) => {
    setUserInput({ ...userInput, ...biodata })
  }

  const useAuthSubmitHandler = async () => {
    console.log(userInput)

    const formComplete = (userInput.firstName && userInput.lastName && userInput.phoneNumber && userInput.address) ? true : false

    if (!formComplete) {
      notifHandler(dispatch, "Please fullfill all required data form")
    } else {
      updateBiodata(userInput)
      dispatch(clearRegInput())
      
      dispatch(logout())
      router.push('/login')
    }
  }

  useEffect(() => {
    if(cookies.regInput && !userInput.email) {
      dispatch(setRegInput({email: cookies.regInput}))
      dispatch(setUserState({email: cookies.regInput}))
      setUserInput({email: cookies.regInput})
    }
    
    if (!cookies.regInput) {
      router.replace('/')
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
              onSubmit={useAuthSubmitHandler}
              setBiodata={biodataInputHandler}
              profileImg={regInput?.imgUrl}
            />
          </div>
        </Container>
      </section>
    </div>
  )
}

DataCapturePage.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}

export default DataCapturePage
