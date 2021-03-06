import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import BtnComp from '../../components/BtnComp/BtnComp'
import Link from 'next/link'
import UserLayout from '../../components/Layouts/UserLayout'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import SliderWithThumbs from '../../components/SliderWithThumbs/SliderWithThumbs'
import { CgGenderMale, CgGenderFemale } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { diffTwoDateInMonths } from '../../helper/dateHelper'
import { capitalizeFirst, setBreedIcon } from '../../helper/textHelper'
import styles from '../../styles/pages/PuppyPage.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPuppiesFb } from '../../redux/slices/puppiesSlice'
import { getPricingFb } from '../../redux/slices/pricingSlice'
import { getPuppyData, getUserActiveBook } from '../../firebase/firebase.utils'

export default function Puppy() {
  const router = useRouter()
  const { id } = router.query
  const { puppies: { puppies }, user: { user } } = useSelector((state) => state)

  const [puppy, setPuppy] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [isSold, setIsSold] = useState(false)

  const [isActiveBooked, setIsActiveBooked] = useState(false)

  const dispatch = useDispatch()

  const getPuppy = useCallback(async () => {
    // Case 1: if puppies are not in Redux => fetch puppies and pricing
    if (puppies.length === 0) {
      setIsLoading(true)
      dispatch(getPuppiesFb())
      dispatch(getPricingFb())
      // Case 2: if puppy are already in Redux => filter and set puppy state
    } else {
      setIsLoading(false)
      const puppyData = puppies.find((p) => p.id === id)
      setPuppy(puppyData)
    }
  }, [puppies, id, dispatch])

  const checkPuppyStatus = useCallback(async (email) => {
    // Check If Puppy has been booked by current User
    if (email) {
      const activeBook = await getUserActiveBook(email)
      const puppyIdOnly = activeBook.map(({ puppyId }) => puppyId)
      if (puppyIdOnly.includes(id)) {
        setIsActiveBooked(true)
      } else setIsActiveBooked(false)
    }

    // Check if its already approved by another user
    const puppyData = await getPuppyData(id)
    puppyData?.bookedStatus === 'approved' ? setIsApproved(true) : setIsApproved(false)
    puppyData?.bookedStatus === 'sold' ? setIsSold(true) : setIsSold(false)
  }, [id])

  useEffect(() => {
    getPuppy()
    checkPuppyStatus(user?.email)
  }, [getPuppy, checkPuppyStatus, user])

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Head>
            <title>{puppy?.displayId} - Kinta-Bali Dog</title>
            <meta
              name='description'
              content='Puppy page - puppy detail and booking Kinta-Bali Dog Site'
            />
          </Head>
          <Container className='full-with-footer'>
            <Row xs={1} xl={2} className={styles.main}>
              <Col className={styles.mainLeft}>
                <div className={styles.mainLeftContainer}>
                  <SliderWithThumbs
                    images={puppy?.imgUrl ? puppy?.imgUrl : []}
                  />
                </div>
              </Col>

              <Col className={styles.mainRight}>
                <div className={styles.mainRightHeader}>
                  <h1>
                    {puppy?.displayId}
                    {setBreedIcon(puppy?.breedQuality)}
                  </h1>
                  <div>
                    <span>
                      {puppy?.sex === 'male' ? (
                        <CgGenderMale />
                      ) : (
                        <CgGenderFemale />
                      )}
                    </span>
                    <p>{`${diffTwoDateInMonths(
                      puppy?.dob,
                      new Date(),
                    )} months`}</p>
                  </div>
                </div>
                <Row xs={2} md={3} className={styles.mainRightCardContainer}>
                  <div className='col'>
                    <div>
                      <p>Coat Color</p>
                      <h5>{capitalizeFirst(puppy?.color)}</h5>
                    </div>
                  </div>
                  <div className='col'>
                    <div>
                      <p>Breed Quality</p>
                      <h5>{capitalizeFirst(puppy?.breedQuality)}</h5>
                    </div>
                  </div>
                  <div className='col'>
                    <div>
                      <p>DoB</p>
                      <h5>
                        {new Date(puppy?.dob).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </h5>
                    </div>
                  </div>
                </Row>
                <div className={styles.mainRightButtons}>
                  <BtnComp
                    type='secondary'
                    borad='pill'
                    padding='10px 30px'
                    margin='0 1rem 0 0'
                    href='https://wa.me/6281335751212'
                    target='_blank'
                  >
                    <span className={styles.mainRightButtonsWa}>
                      <WaIcon /> <span>Contact Kennel</span>
                    </span>
                  </BtnComp>
                  {!isActiveBooked && !isApproved && !isSold ?
                    <Link href={`/book/${id}`}>
                      <BtnComp borad='pill' padding='10px 60px'>
                        Book this Pupppy
                      </BtnComp>
                    </Link> : isSold ?
                      <BtnComp type='link' style={{ cursor: 'not-allowed' }} padding='10px'>
                        Sorry, the puppy has sold
                      </BtnComp>
                      : isActiveBooked ?
                        <BtnComp type='link' style={{ cursor: 'not-allowed' }} padding='10px'>
                          You&apos;ve booked this
                        </BtnComp>
                        : isApproved &&
                        <BtnComp type='link' style={{ cursor: 'not-allowed' }} padding='10px'>
                          Opps, this puppy has been booked but not sold yet
                        </BtnComp>
                  }
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  )
}

Puppy.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>
}

function WaIcon() {
  return (
    <svg width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.5 23.25C18.299 23.25 23 18.549 23 12.75C23 6.95101 18.299 2.25 12.5 2.25C6.70101 2.25 2 6.95101 2 12.75C2 14.6332 2.49575 16.4005 3.36386 17.9287L2 23.25L7.48615 21.9778C8.97603 22.7891 10.6842 23.25 12.5 23.25ZM12.5 21.6346C17.4068 21.6346 21.3846 17.6568 21.3846 12.75C21.3846 7.84316 17.4068 3.86538 12.5 3.86538C7.59316 3.86538 3.61538 7.84316 3.61538 12.75C3.61538 14.6445 4.20838 16.4006 5.21888 17.8427L4.42308 20.8269L7.45995 20.0677C8.89202 21.0559 10.6284 21.6346 12.5 21.6346Z'
        fill='#BFC8D0'
      />
      <path
        d='M21.5 12C21.5 16.9706 17.4706 21 12.5 21C10.6041 21 8.84516 20.4138 7.39449 19.4127L4.31818 20.1818L5.12432 17.1588C4.10069 15.698 3.5 13.9192 3.5 12C3.5 7.02944 7.52944 3 12.5 3C17.4706 3 21.5 7.02944 21.5 12Z'
        fill='url(#paint0_linear_208_2819)'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.5 22.5C18.299 22.5 23 17.799 23 12C23 6.20101 18.299 1.5 12.5 1.5C6.70101 1.5 2 6.20101 2 12C2 13.8832 2.49575 15.6505 3.36386 17.1787L2 22.5L7.48615 21.2278C8.97603 22.0391 10.6842 22.5 12.5 22.5ZM12.5 20.8846C17.4068 20.8846 21.3846 16.9068 21.3846 12C21.3846 7.09316 17.4068 3.11538 12.5 3.11538C7.59316 3.11538 3.61538 7.09316 3.61538 12C3.61538 13.8945 4.20838 15.6506 5.21888 17.0927L4.42308 20.0769L7.45995 19.3177C8.89202 20.3059 10.6284 20.8846 12.5 20.8846Z'
        fill='white'
      />
      <path
        d='M9.87502 7.12504C9.62537 6.6236 9.2424 6.668 8.85551 6.668C8.16407 6.668 7.08594 7.49621 7.08594 9.03759C7.08594 10.3008 7.64259 11.6836 9.51831 13.7522C11.3285 15.7485 13.707 16.7812 15.6817 16.7461C17.6563 16.7109 18.0625 15.0117 18.0625 14.4379C18.0625 14.1835 17.9047 14.0566 17.796 14.0221C17.1231 13.6992 15.882 13.0975 15.5996 12.9844C15.3172 12.8714 15.1698 13.0243 15.0781 13.1075C14.8221 13.3515 14.3144 14.0707 14.1406 14.2325C13.9668 14.3942 13.7077 14.3124 13.5999 14.2512C13.2031 14.092 12.1272 13.6134 11.2696 12.7821C10.209 11.754 10.1467 11.4002 9.94693 11.0854C9.78707 10.8335 9.90437 10.6789 9.96291 10.6114C10.1914 10.3477 10.507 9.94061 10.6485 9.73832C10.79 9.53602 10.6776 9.22889 10.6102 9.03759C10.3203 8.21488 10.0747 7.52618 9.87502 7.12504Z'
        fill='white'
      />
      <defs>
        <linearGradient
          id='paint0_linear_208_2819'
          x1='20.375'
          y1='5.25'
          x2='3.5'
          y2='21'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#5BD066' />
          <stop offset='1' stopColor='#27B43E' />
        </linearGradient>
      </defs>
    </svg>
  )
}
