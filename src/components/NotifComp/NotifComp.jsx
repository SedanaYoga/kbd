import styles from './NotifComp.module.scss'
import {
  BsExclamationCircleFill,
  BsFillXCircleFill,
  BsCheckCircleFill,
  BsX
} from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotif } from '../../redux/slices/notifSlice'

const NotifComp = () => {
  const { isShown, notif, type } = useSelector((state) => state.notif)
  const dispatch = useDispatch()
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
        <div className={styles.ntLeftClose} onClick={() => dispatch(clearNotif())}>
          <BsX size='1.5rem' />
        </div>
      </div>
      <div className={styles.ntRight}>
        <h4>{type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Warning'}</h4>
        <p>{notif}</p>
      </div>
    </div>
  )
}

export default NotifComp
