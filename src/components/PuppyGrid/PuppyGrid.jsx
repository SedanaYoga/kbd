import { Row, Col } from 'react-bootstrap'
import styles from './PuppyGrid.module.scss'
import PuppyCard from '../PuppyCard/PuppyCard'
import Link from 'next/link'

const PuppyList = ({ puppies, endSlice = puppies.length }) => {
  return (
    <div className={styles.puppyGrid}>
      <Row xs={2} md={3} lg={4} className={styles.cardContainer}>
        {puppies.slice(0, endSlice).map((puppy) => (
          <Col key={puppy.id}>
            <Link href={`/browse/${puppy.id}`}>
              <PuppyCard {...puppy} />
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default PuppyList
