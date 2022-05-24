import styles from './NotifComp.module.scss'
import {
  BsExclamationCircleFill,
  BsFillXCircleFill,
  BsCheckCircleFill,
} from 'react-icons/bs'

const NotifComp = ({ type }) => {
  console.log(styles)
  let ntCl = ''
  switch (type) {
    case 'success':
      ntCl = `${styles.nt} ${styles.success}`
      break
    case 'error':
      ntCl = `${styles.nt} ${styles.error}`
      break
    case 'warning':
      ntCl = `${styles.nt} ${styles.warning}`
      break
    default:
      break
  }
  return (
    <div className={styles.nt}>
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
        <h4>Error</h4>
        <p>Something went wrong...</p>
      </div>
    </div>
  )
}

export default NotifComp
NotifComp.defaultProps = {
  type: 'error',
}
