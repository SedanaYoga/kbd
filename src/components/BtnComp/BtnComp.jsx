import React from 'react'
import styles from './BtnComp.module.scss'

const BtnComp = React.forwardRef(
  (
    { onClick, href, target, rel, children, style, type, margin, fontSize, padding, borad },
    ref,
  ) => {
    let btnCl = `btn`
    switch (type) {
      case 'primary':
        btnCl = `${styles.btn} ${styles.primary}`
        break
      case 'secondary':
        btnCl = `${styles.btn} ${styles.secondary}`
        break
      case 'link':
        btnCl = `${styles.btn} ${styles.link}`
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
        target={target}
        rel={rel}
        style={{
          padding,
          fontSize,
          margin,
          borderRadius:
            borad === 'pill' ? '50px' : borad === 'none' ? '0px' : '4px',
          ...style,
        }}>
        {children}
      </a>
    )
  },
)

export default BtnComp

BtnComp.displayName = 'BtnComp'

BtnComp.defaultProps = {
  target: '_self',
  rel: 'noreferrer noopener',
  type: 'primary',
  margin: '0',
  padding: '10px 14px',
  fontSize: '1rem',
  borderRadius: '4px',
}
