import { Spinner } from 'react-bootstrap'
import styles from './LoadingSpinner.module.scss'

const LoadingSpinner = () => {
  return (
    <div className={`full-with-footer ${styles.container}`}>
      <div className={styles.spinner}>
        <Spinner animation='border' />
      </div>
    </div>
  )
}

export default LoadingSpinner
