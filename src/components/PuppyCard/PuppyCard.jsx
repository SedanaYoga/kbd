import { CgGenderMale } from 'react-icons/cg'
import { CgGenderFemale } from 'react-icons/cg'
import {
  diffTwoDateInMonths,
  timeStampToDateString,
} from '../../helper/dateHelper'
import styles from './PuppyCard.module.scss'
import React from 'react'

const PuppyCard = React.forwardRef(
  ({ onClick, href, imgUrl, breedQuality, sex, id, color, dob }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <div className={styles.card}>
          <img src={imgUrl} alt={`puppies ${id}`} className={styles.cardImg} />
          <div className={styles.cardTag}>
            <div className={styles.cardTagSex}>
              <div>
                {sex === 'male' ? <CgGenderMale /> : <CgGenderFemale />}
              </div>
            </div>
            <div className={styles.cardTagColor}>
              <div className={styles[color]}></div>
            </div>
            <div className={styles.cardTagAge}>
              <div>{`${diffTwoDateInMonths(
                new Date(),
                timeStampToDateString(dob),
              )} months`}</div>
            </div>
          </div>
          <div className={styles.medal}>
            {breedQuality === 'normal'
              ? '🥇'
              : breedQuality === 'premium'
              ? '🥈'
              : '🥉'}
          </div>
        </div>
      </a>
    )
  },
)

export default PuppyCard
