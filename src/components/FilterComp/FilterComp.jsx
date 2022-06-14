import styles from './FilterComp.module.scss'
import { BsX } from 'react-icons/bs'
import { useState } from 'react'

const FilterComp = ({ filterHandler }) => {
  const [sex, setSex] = useState('')
  const [color, setColor] = useState('')
  const [quality, setQuality] = useState('')

  const clearFilter = () => {
    setSex('')
    setColor('')
    setQuality('')
    filterHandler('', '', '')
  }

  const setFilterState = (type, value) => {
    if (type === 'sex') {
      const newValue = sex !== value ? value : ''
      setSex(prev => prev !== value ? value : '')
      filterHandler(newValue, color, quality)
    } else if (type === 'color') {
      const newValue = color !== value ? value : ''
      setColor(prev => prev !== value ? value : '')
      filterHandler(sex, newValue, quality)
    } else if (type === 'quality') {
      const newValue = quality !== value ? value : ''
      setQuality(prev => prev !== value ? value : '')
      filterHandler(sex, color, newValue)
    }
  }

  return (
    <div className={styles.browseFilter}>
      <div className={styles.browseFilterSex}>
        <div className={`${styles.browseFilterSexMale} ${sex === 'male' ? styles.active : ''} `} onClick={() => setFilterState('sex', 'male')}>Male</div>
        <div className={`${styles.browseFilterSexFemale} ${sex === 'female' ? styles.active : ''}`} onClick={() => setFilterState('sex', 'female')}>Female</div>
      </div>
      <div className={styles.browseFilterColor}>
        <div className={`${styles.browseFilterColorWhite} ${color === 'white' ? styles.active : ''}`} onClick={() => setFilterState('color', 'white')}>
          <span></span> White
        </div>
        <div className={`${styles.browseFilterColorBlack} ${color === 'black' ? styles.active : ''}`} onClick={() => setFilterState('color', 'black')}>
          <span></span> Black
        </div>
        <div className={`${styles.browseFilterColorBrown} ${color === 'brown' ? styles.active : ''}`} onClick={() => setFilterState('color', 'brown')}>
          <span></span> Brown
        </div>
        <div className={`${styles.browseFilterColorBridle} ${color === 'bridle' ? styles.active : ''}`} onClick={() => setFilterState('color', 'bridle')}>
          <span></span> Bridle
        </div>
      </div>
      <div className={styles.browseFilterQuality}>
        <div className={`${styles.browseFilterQualityChampion} ${quality === 'champion' ? styles.active : ''}`} onClick={() => setFilterState('quality', 'champion')}>
          <p>🥇</p>
        </div>
        <div className={`${styles.browseFilterQualityPremium} ${quality === 'premium' ? styles.active : ''}`} onClick={() => setFilterState('quality', 'premium')}>
          <p>🥈</p>
        </div>
        <div className={`${styles.browseFilterQualityNormal} ${quality === 'normal' ? styles.active : ''}`} onClick={() => setFilterState('quality', 'normal')}>
          <p>🥉</p>
        </div>
      </div>
      <div className={styles.browseClear} onClick={clearFilter}><BsX size='1.5rem' /> <p>Clear</p> </div>
    </div>
  )
}

export default FilterComp
