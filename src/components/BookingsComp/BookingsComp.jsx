
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import styles from './BookingComp.module.scss'
import { useSelector } from 'react-redux'
import { getUserActiveBook } from '../../firebase/firebase.utils'
import { capitalizeFirst, strToCurrency } from '../../helper/textHelper'
import { timeStampToDateString } from '../../helper/dateHelper'

const BookingsComp = () => {
  const { user: { user: { email } } } = useSelector(state => state)

  const [bookedPuppy, setBookedPuppy] = useState([])

  const getBookedDataByEmail = useCallback(async (email) => {
    const result = await getUserActiveBook(email)
    setBookedPuppy(result)
  }, [email])

  useEffect(() => {
    getBookedDataByEmail(email)
  }, [getBookedDataByEmail])

  return (
    <div className={styles.booking}>
      <Table hover>
        <thead>
          <tr>
            <th>Puppies</th>
            <th>Quality</th>
            <th>Appt Time</th>
            <th>Requester</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookedPuppy.map((puppy, index) =>
            <tr key={index} className={styles.bookingRow}>
              <td>
                <div className={styles.bookingRowPuppy}>
                  <Image
                    src={puppy.imgUrl.downloadUrl}
                    className={styles.bookingRowPuppyImage}
                    alt='booked puppy'
                    width={48}
                    height={48}
                  />
                  <p className='ms-3'>{puppy.puppyId.split('_')[1]}</p>
                </div>
              </td>
              <td>{strToCurrency(puppy.adoptPrice)}</td>
              <td>{timeStampToDateString(puppy.apptTime)}</td>
              <td>{puppy.requesterEmail}</td>
              <td>{capitalizeFirst(puppy.status)}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BookingsComp
