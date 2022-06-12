import { useEffect, useState } from 'react'
import styles from './InputComp.module.scss'

const InputComp = ({ label, getNameValue, valueFromParent, type, name }) => {
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState('')

  const changeHandler = (e) => {
    const value = e.target.value
    const name = e.target.name
    setValue(value)
    if (getNameValue) getNameValue(name, value)
    value !== '' ? setIsActive(true) : setIsActive(false)
  }

  useEffect(() => {
    if (valueFromParent) {
      setValue(valueFromParent)
      setIsActive(true)
    }
  }, [valueFromParent])

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

export default InputComp
