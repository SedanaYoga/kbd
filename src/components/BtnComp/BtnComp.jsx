import React from 'react'
import styles from './BtnComp.module.scss'

const BtnComp = React.forwardRef(
  ({ onClick, href, children, type, margin, fontSize, padding }, ref) => {
    let btnCl = `btn`
    switch (type) {
      case 'primary':
        btnCl = `${styles.btn} ${styles.primary}`
        break
      case 'secondary':
        btnCl = `${styles.btn} ${styles.secondary}`
        break
      case 'link':
        btnCl = `${styles.btj} ${styles.link}`
        break
      default:
        break
    }

    return (
      <a
        href={href}
        onClick={onClick}
        ref={ref}
        className={btnCl}
        style={{
          padding,
          fontSize,
          margin,
        }}
      >
        {children}
      </a>
    )
  },
)

export default BtnComp

BtnComp.defaultProps = {
  type: 'primary',
  margin: '0',
  padding: '10px 14px',
  fontSize: '1rem',
}
