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
  uploadFiles, deleteFiles
} from '../../firebase/firebase.utils'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/userSlice'
import { clearRegInput } from '../../redux/slices/registerSlice'
import { notifHandler } from '../../helper/errorHelper'

const DataCapturePage = () => {
  const router = useRouter()
  const { msg } = router.query

  const dispatch = useDispatch()
  const {
    regInput: { inputUser: regInput },
  } = useSelector((state) => state)

  const [userInput, setUserInput] = useState({
    email: regInput?.email,
    password: regInput?.password,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  })

  const biodataInputHandler = (biodata, isPicUploaded) => {
    if (userInput.imgUrl && !isPicUploaded && userInput.imgUrl.hasOwnProperty('downloadUrl')) {
      const { imgUrl, ...biodataWithoutImgUrl } = biodata
      setUserInput({ ...userInput, ...biodataWithoutImgUrl })
    } else {
      setUserInput({ ...userInput, ...biodata })
    }
  }

  const onAuthSubmitHandler = async () => {
    console.log(userInput)
    const result = {}
    if (msg === 'googleSignUp') {
      // Firestore creation, since the auth part is handled in Register page
      result = await setGoogleDataToFirestore(regInput, userInput)
    } else {
      result = await signUpWithEmailAndPassword(userInput)
    }
    if (result.error) {
      notifHandler(dispatch, result.error, 'error')
    } else {
      dispatch(login(result))
      router.push('/')
    }
    dispatch(clearRegInput())
  }

  const onUploadPic = async () => {
    if (!userInput.imgUrl) {
      notifHandler(dispatch, 'No image is selected, please select first!', 'error')
    } else {
      const uploadResult = await uploadFiles(userInput.imgUrl, 'profilePic', userInput.email)
      const userInputWithDownloadedUrl = { ...userInput, imgUrl: uploadResult }
      setUserInput(userInputWithDownloadedUrl)
      notifHandler(dispatch, 'Your profile picture has successfully uploaded!', 'success')
    }
  }

  const deletePrevImage = async () => {
    if (userInput.imgUrl) {
      if (typeof userInput.imgUrl.hasOwnProperty('fileNameOnUpload')) {
        await deleteFiles(userInput.imgUrl.fileNameOnUpload, 'profilePic')
      }
    }
  }

  const onDeletePic = async () => {
    if (typeof userInput.imgUrl.hasOwnProperty('fileNameOnUpload')) {
      await deleteFiles(userInput.imgUrl.fileNameOnUpload, 'profilePic')
    }
    setUserInput({ ...userInput, imgUrl: { downloadUrl: '/images/default-user.jpg', fileNameOnUpload: '' } })
  }

  useEffect(() => {
    if (regInput === null) {
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
              onSubmit={onAuthSubmitHandler}
              onUploadPic={onUploadPic}
              onDeletePic={onDeletePic}
              setBiodata={biodataInputHandler}
              profileImg={regInput?.imgUrl}
              deletePrevImage={deletePrevImage}
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
