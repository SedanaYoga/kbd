import { Row, Col } from 'react-bootstrap'
import styles from '../../components/PuppyGrid/PuppyGrid.module.scss'
import { CgGenderMale } from 'react-icons/cg'
import { CgGenderFemale } from 'react-icons/cg'
import { diffTwoDateInMonths } from '../../helper/textHelper'

const PuppyList = ({ puppies }) => {
  return (
    <div className={styles.puppyGrid}>
      <Row xs={2} md={3} lg={4} className={styles.cardContainer}>
        {puppies.map(({ imgUrl, sex, id, color, dob }) => (
          <Col key={id}>
            <div className={styles.card}>
              <img
                src={imgUrl}
                alt={`puppies ${id}`}
                className={styles.cardImg}
              />
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
              <div className={styles.medal}>🥇</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default PuppyList
