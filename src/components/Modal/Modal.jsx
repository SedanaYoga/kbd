import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.scss'
import { GrFormClose } from 'react-icons/gr'

const Modal = ({ show, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleCloseClick = (e) => {
    e.preventDefault()
    onClose()
  }
  const ModalContent = show ? (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <a href='#' onClick={handleCloseClick} className={styles.modalClose}>
          <GrFormClose />
        </a>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return createPortal(ModalContent, document.getElementById('modal-root'))
  } else {
    return null
  }
}

export default Modal
