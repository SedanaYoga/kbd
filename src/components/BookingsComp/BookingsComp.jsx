import Image from 'next/image'
import { Table } from 'react-bootstrap'
import styles from './BookingComp.module.scss'

const BookingsComp = () => {
  return (
    <div className={styles.booking}>
      <Table hover>
        <thead>
          <tr>
            <th>Puppies</th>
            <th>Quality</th>
            <th>DoB</th>
            <th>Requester</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.bookingRow}>
            <td>
              <div className={styles.bookingRowPuppy}>
                <Image
                  src='/images/kin-browse/1.png'
                  className={styles.bookingRowPuppyImage}
                  alt='booked puppy'
                  width={48}
                  height={48}
                />
                <p className='ms-3'>PC06042022F</p>
              </div>
            </td>
            <td>Premium</td>
            <td>06 April 2022</td>
            <td>Sedana Yoga</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default BookingsComp
