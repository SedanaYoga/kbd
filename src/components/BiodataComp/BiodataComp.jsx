import styles from './BiodataComp.module.scss'
import BtnComp from '../BtnComp/BtnComp'
import InputComp from '../InputComp/InputComp'

const BiodataComp = ({ type, user }) => {
  return (
    <div className={styles.biodata}>
      <div className={styles.biodataPic}>
        <div className={styles.biodataPicLeft}>
          <img src='/images/user.png' alt='biodata-photo' />
        </div>
        <div className={styles.biodataPicRight}>
          <h3>Profile Picture</h3>
          <p>This will be displayed on your profile</p>
          <div className={styles.biodataPicRightButtons}>
            <BtnComp type='secondary' padding='0.5rem 1rem'>
              Upload
            </BtnComp>
            <BtnComp type='secondary' padding='0.5rem 1rem'>
              Delete
            </BtnComp>
          </div>
        </div>
      </div>

      <div className={styles.biodataData}>
        <div className={styles.biodataDataName}>
          <InputComp type='text' name='firstName' label='First Name' />
          <InputComp type='text' name='lastName' label='Last Name' />
        </div>
        <InputComp type='text' name='phoneNumber' label='Phone Number' />
        <InputComp type='text' name='address' label='Address' />
      </div>

      <BtnComp type='primary' borad='pill' padding='0.5rem 4rem'>
        {type === 'data-capture' ? 'Register' : 'Update'}
      </BtnComp>
    </div>
  )
}

export default BiodataComp
