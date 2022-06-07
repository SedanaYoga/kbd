import styles from './BiodataComp.module.scss'
import BtnComp from '../BtnComp/BtnComp'
import InputComp from '../InputComp/InputComp'
import { useState } from 'react'

const BiodataComp = ({
  type,
  setBiodata,
  onUploadPic,
  onDeletePic,
  onSubmit,
  profileImg,
}) => {
  const [biodataInput, setBiodataInput] = useState({
    imgUrl: profileImg ? profileImg : '/images/default-user.png',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  })

  const handleChange = (name, value) => {
    setBiodata && setBiodata(biodataInput)
    setBiodataInput({ ...biodataInput, [name]: value })
  }

  const submitHandler = () => {
    onSubmit()
  }

  const uploadPicHandler = () => {
    onUploadPic()
  }
  const deletePicHandler = () => {
    onDeletePic()
  }

  return (
    <div className={styles.biodata}>
      <div className={styles.biodataPic}>
        <div className={styles.biodataPicLeft}>
          <img src={biodataInput.imgUrl} alt='biodata-photo' />
          <input
            type='file'
            onChange={handleChange}
            className={styles.inputPic}
          />
        </div>
        <div className={styles.biodataPicRight}>
          <h3>Profile Picture</h3>
          <p>This will be displayed on your profile</p>
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
            setNameValue={handleChange}
            name='firstName'
            label='First Name'
          />
          <InputComp
            type='text'
            setNameValue={handleChange}
            name='lastName'
            label='Last Name'
          />
        </div>
        <InputComp
          type='text'
          setNameValue={handleChange}
          name='phoneNumber'
          label='Phone Number'
        />
        <InputComp
          type='text'
          setNameValue={handleChange}
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
        {type === 'data-capture' ? 'Register' : 'Update'}
      </BtnComp>
    </div>
  )
}

export default BiodataComp
