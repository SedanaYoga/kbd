import styles from './NotifComp.module.scss'
import {
  BsExclamationCircleFill,
  BsFillXCircleFill,
  BsCheckCircleFill,
} from 'react-icons/bs'
import { useSelector } from 'react-redux'

const NotifComp = () => {
  const { isShown, notif, type } = useSelector((state) => state.notif)
  return (
    <div className={`${styles.nt} ${isShown ? styles.active : ''}`}>
      <div className={styles.ntLeft}>
        {type === 'success' ? (
          <BsCheckCircleFill size='2rem' color='limegreen' />
        ) : type === 'error' ? (
          <BsFillXCircleFill size='2rem' color='crimson' />
        ) : (
          <BsExclamationCircleFill size='2rem' color='gold' />
        )}
      </div>
      <div className={styles.ntRight}>
        <h4>{type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Warning'}</h4>
        <p>{notif}</p>
      </div>
    </div>
  )
}

export default NotifComp
