import Head from 'next/head'
import { Container } from 'react-bootstrap'
import styles from '../../styles/pages/ProfilePage.module.scss'
import UserLayout from '../../components/Layouts/UserLayout'
import BtnComp from '../../components/BtnComp/BtnComp'
import BiodataComp from '../../components/BiodataComp/BiodataComp'
import BookingsComp from '../../components/BookingsComp/BookingsComp'
import { useEffect, useState } from 'react'
import { getBiodata, updateBiodata, uploadFiles, deleteFiles } from '../../firebase/firebase.utils'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { notifHandler } from '../../helper/errorHelper'

const ProfilePage = () => {
  const [showBooking, setShowBooking] = useState(false)
  const { regInput } = parseCookies()
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  const [userBiodata, setUserBiodata] = useState(null)

  const getBiodataHandler = async (id) => {
    const result = await getBiodata(id, 'profile')
    setUserBiodata(result)
  }

  useEffect(() => {
    getBiodataHandler(id)
    if (regInput) router.replace('/data-capture')
  }, [])

  const openBiodata = () => {
    setShowBooking(false)
  }
  const openBookings = () => {
    setShowBooking(true)
  }

  const updateProfileHandler = async () => {
    const formComplete =
      userBiodata.firstName &&
        userBiodata.lastName &&
        userBiodata.phoneNumber &&
        userBiodata.address
        ? true
        : false

    if (!formComplete) {
      notifHandler(dispatch, 'Please fullfill all required data form')
    } else {
      notifHandler(dispatch, 'Updating...', 'warning')
      await updateBiodata(userBiodata)
      notifHandler(dispatch, 'Profile is successfully updated!', 'success')
    }
  }
  const onUploadPic = async () => {
    if (!userBiodata.imgUrl) {
      notifHandler(
        dispatch,
        'No image is selected, please select first!',
        'error'
      )
    } else {
      const uploadResult = await uploadFiles(
        userBiodata.imgUrl,
        'profilePic',
        userBiodata.email
      )
      const userInputWithDownloadedUrl = { ...userBiodata, imgUrl: uploadResult }
      setUserBiodata(userInputWithDownloadedUrl)
      notifHandler(
        dispatch,
        'Your profile picture has successfully uploaded!',
        'success'
      )
    }
  }
  const onDeletePic = async () => {
    if (userBiodata.imgUrl.hasOwnProperty('fileNameOnUpload')) {
      await deleteFiles(userBiodata.imgUrl.fileNameOnUpload, 'profilePic')
    }
    setUserBiodata({
      ...userBiodata,
      imgUrl: { downloadUrl: '/images/default-user.jpg', fileNameOnUpload: '' },
    })
  }
  const biodataInputHandler = (biodata, isPicUploaded) => {
    if (
      userBiodata.imgUrl &&
      userBiodata.imgUrl.hasOwnProperty('downloadUrl')
    ) {
      if (isPicUploaded) {
        setUserBiodata({ ...userBiodata, ...biodata })
      } else {
        const { imgUrl, ...biodataWithoutImgUrl } = biodata
        setUserBiodata({ ...userBiodata, ...biodataWithoutImgUrl })
      }
    } else {
      setUserBiodata({ ...userBiodata, ...biodata })
    }
  }

  const deletePrevImage = async () => {
    if (userBiodata.imgUrl) {
      if (userBiodata.imgUrl.hasOwnProperty('fileNameOnUpload') && userBiodata.imgUrl.fileNameOnUpload !== '') {
        await deleteFiles(userBiodata.imgUrl.fileNameOnUpload, 'profilePic')
      }
    }
  }


  return (
    <div>
      <Head>
        <title>Profile Page - Kinta-Bali Dog</title>
        <meta
          name='description'
          content='Profile Page - Kinta-Dog Bali adoption platform'
        />
      </Head>

      <section className='full-with-footer'>
        <Container>
          <div className={styles.profile}>
            <h1 className={styles.profileTitle}>
              Here&#39;s <span>your profile ❤️ </span>
            </h1>

            <div className={styles.profileSubPage}>
              <BtnComp
                style={{ borderRight: '1px solid black' }}
                onClick={openBiodata}
                type='link'
                padding='0 1rem'
                borad='none'>
                Biodata
              </BtnComp>
              <BtnComp onClick={openBookings} type='link' padding='0 1rem'>
                Bookings
              </BtnComp>
            </div>
            {showBooking ? <BookingsComp /> : <BiodataComp
              profileData={userBiodata && userBiodata}
              onSubmit={updateProfileHandler}
              onUploadPic={onUploadPic}
              onDeletePic={onDeletePic}
              setBiodataToParent={biodataInputHandler}
              deletePrevImage={deletePrevImage}
            />}
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
