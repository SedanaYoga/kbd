import Head from 'next/head'
import { Container } from 'react-bootstrap'
import styles from '../../styles/pages/DataCapture.module.scss'
import UserLayout from '../../components/Layouts/UserLayout'
import BiodataComp from '../../components/BiodataComp/BiodataComp'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  updateBiodata,
  uploadFiles,
  deleteFiles
} from '../../firebase/firebase.utils'
import { useDispatch } from 'react-redux'
import { logout, setUserState } from '../../redux/slices/userSlice'
import { clearRegInput, setRegInput } from '../../redux/slices/registerSlice'
import { notifHandler } from '../../helper/errorHelper'
import nookies from 'nookies'

const DataCapturePage = (ctx) => {
  const router = useRouter()
  const { imgDownloadUrl } = router.query
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

  const biodataInputHandler = (biodata, isPicUploaded) => {
    if (
      userInput.imgUrl &&
      userInput.imgUrl.hasOwnProperty('downloadUrl')
    ) {
      if (isPicUploaded) {
        setUserInput({ ...userInput, ...biodata })
      } else {
        const { imgUrl, ...biodataWithoutImgUrl } = biodata
        setUserInput({ ...userInput, ...biodataWithoutImgUrl })
      }
    } else {
      setUserInput({ ...userInput, ...biodata })
    }
  }

  const onAuthSubmitHandler = async () => {
    const formComplete =
      userInput.firstName &&
        userInput.lastName &&
        userInput.phoneNumber &&
        userInput.address
        ? true
        : false

    if (!formComplete) {
      notifHandler(dispatch, 'Please fullfill all required data form')
    } else {
      updateBiodata(userInput)
      dispatch(clearRegInput())

      dispatch(logout())
      router.push('/login')
    }
  }

  const onUploadPic = async () => {
    if (!userInput.imgUrl) {
      notifHandler(
        dispatch,
        'No image is selected, please select first!',
        'error'
      )
    } else {
      const uploadResult = await uploadFiles(
        userInput.imgUrl,
        'profilePic',
        userInput.email
      )
      const userInputWithDownloadedUrl = { ...userInput, imgUrl: uploadResult }
      setUserInput(userInputWithDownloadedUrl)
      notifHandler(
        dispatch,
        'Your profile picture has successfully uploaded!',
        'success'
      )
    }
  }

  const deletePrevImage = async () => {
    if (userInput.imgUrl) {
      if (userInput.imgUrl.hasOwnProperty('fileNameOnUpload') && userInput.imgUrl.fileNameOnUpload !== '') {
        await deleteFiles(userInput.imgUrl.fileNameOnUpload, 'profilePic')
      }
    }
  }

  const onDeletePic = async () => {
    if (userInput.imgUrl.hasOwnProperty('fileNameOnUpload')) {
      await deleteFiles(userInput.imgUrl.fileNameOnUpload, 'profilePic')
    }
    setUserInput({
      ...userInput,
      imgUrl: { downloadUrl: '/images/default-user.jpg', fileNameOnUpload: '' },
    })
  }

  useEffect(() => {
    if (cookies.regInput && !userInput.email) {
      dispatch(setRegInput({ email: cookies.regInput }))
      dispatch(setUserState({ email: cookies.regInput }))
      setUserInput({ email: cookies.regInput, imgUrl: { downloadUrl: imgDownloadUrl ? imgDownloadUrl : '', fileNameOnUpload: '' } })
    }

    if (!cookies.regInput) {
      router.replace('/')
    }
  }, [cookies.regInput, dispatch, router, userInput.email])

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
              setBiodataToParent={biodataInputHandler}
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
