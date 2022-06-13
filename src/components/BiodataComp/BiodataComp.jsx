import Image from 'next/image'
import styles from './BiodataComp.module.scss'
import BtnComp from '../BtnComp/BtnComp'
import InputComp from '../InputComp/InputComp'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const BiodataComp = ({
  type,
  setBiodataToParent,
  onUploadPic,
  onDeletePic,
  onSubmit,
  profileImg,
  deletePrevImage,
  profileData,
}) => {
  const router = useRouter()
  const { imgDownloadUrl } = router.query

  const [biodataInput, setBiodataInput] = useState({
    imgUrl: profileImg ? profileImg : '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [isPicUploaded, setIsPicUploaded] = useState(true)

  const handleChange = async (name, value) => {
    if (name === 'imgUrl') {
      setIsPicUploaded(false)
      setPreviewImage(URL.createObjectURL(value))
      deletePrevImage()
      const newBiodataInput = { ...biodataInput, [name]: value }
      setBiodataToParent && setBiodataToParent(newBiodataInput, isPicUploaded)
      setBiodataInput(newBiodataInput)
    } else {
      const { imgUrl, ...biodataInputWithoutImgUrl } = biodataInput
      const newBiodataInput = { ...biodataInputWithoutImgUrl, [name]: value }
      setBiodataToParent && setBiodataToParent(newBiodataInput, isPicUploaded)
      setBiodataInput(newBiodataInput)
    }
  }

  const submitHandler = () => {
    onSubmit()
  }

  const uploadPicHandler = () => {
    onUploadPic()
    setIsPicUploaded(true)
  }

  const deletePicHandler = () => {
    onDeletePic()
    setBiodataInput({ ...biodataInput, imgUrl: '' })
    setPreviewImage('')
  }

  useEffect(() => {
    if (imgDownloadUrl) setPreviewImage(imgDownloadUrl)
    if (profileData && !previewImage) {
      setBiodataInput({
        imgUrl: profileData.imgUrl,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
      })
      setPreviewImage(profileData.imgUrl.downloadUrl)
    }
  }, [profileData, imgDownloadUrl, previewImage])

  return (
    <div className={styles.biodata}>
      <div className={styles.biodataPic}>
        <div className={styles.biodataPicLeft}>
          <Image
            src={previewImage ? previewImage : '/images/default-user.png'}
            alt='biodata-photo'
            width={120}
            height={120}
          />
          <input
            type='file'
            name='imgUrl'
            onChange={(e) => {
              const { name, files } = e.target
              handleChange(name, files[0])
              // console.log(files[0])
            }}
            className={styles.inputPic}
          />
        </div>
        <div className={styles.biodataPicRight}>
          <h3>Profile Picture</h3>
          <p>
            {isPicUploaded
              ? 'This will be displayed on your profile'
              : 'Please Upload before submitting!'}
          </p>
          <div className={styles.biodataPicRightButtons}>
            <BtnComp
              type='secondary'
              padding='0.5rem 1rem'
              onClick={uploadPicHandler}
            >
              Upload
            </BtnComp>
            <BtnComp
              type='secondary'
              padding='0.5rem 1rem'
              onClick={deletePicHandler}
            >
              Delete
            </BtnComp>
          </div>
        </div>
      </div>

      <div className={styles.biodataData}>
        <div className={styles.biodataDataName}>
          <InputComp
            type='text'
            getNameValue={handleChange}
            valueFromParent={biodataInput.firstName}
            name='firstName'
            label='First Name'
          />
          <InputComp
            type='text'
            getNameValue={handleChange}
            valueFromParent={biodataInput.lastName}
            name='lastName'
            label='Last Name'
          />
        </div>
        <InputComp
          type='text'
          getNameValue={handleChange}
          valueFromParent={biodataInput.phoneNumber}
          name='phoneNumber'
          label='Phone Number'
        />
        <InputComp
          type='text'
          getNameValue={handleChange}
          valueFromParent={biodataInput.address}
          name='address'
          label='Address'
        />
      </div>

      <BtnComp
        type='primary'
        onClick={submitHandler}
        borad='pill'
        padding='0.5rem 4rem'
      >
        {type === 'data-capture' ? 'Confirm' : 'Update'}
      </BtnComp>
    </div>
  )
}

export default BiodataComp
