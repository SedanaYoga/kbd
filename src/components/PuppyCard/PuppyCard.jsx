import Image from 'next/image'
import { CgGenderMale } from 'react-icons/cg'
import { CgGenderFemale } from 'react-icons/cg'
import { diffTwoDateInMonths } from '../../helper/dateHelper'
import styles from './PuppyCard.module.scss'
import React from 'react'

const PuppyCard = React.forwardRef(
  ({ onClick, href, imgUrl, breedQuality, sex, id, color, dob }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <div className={styles.card}>
          <div className={styles.cardImg}>
            <Image src={imgUrl[0]} alt={`puppies ${id}`} layout='fill' />
          </div>
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
              <div>{`${diffTwoDateInMonths(new Date(), dob)} months`}</div>
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
  }
)

PuppyCard.displayName = 'PuppyCard'

export default PuppyCard
