import { useState } from 'react'
import styles from './InputComp.module.scss'

export default ({ label, type, name }) => {
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState('')

  const changeHandler = (e) => {
    const text = e.target.value
    setValue(text)
    text !== '' ? setIsActive(true) : setIsActive(false)
  }
  return (
    <div className={styles.floatLabel}>
      <input
        type={type}
        value={value}
        onChange={changeHandler}
        name={name}
        required
      />
      <label htmlFor={name} className={isActive ? styles.active : ''}>
        {label}
      </label>
    </div>
  )
}
