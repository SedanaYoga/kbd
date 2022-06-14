import React from 'react'
import styles from './PaginationComp.module.scss'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import { pageNumberToShow } from '../../helper/textHelper'

const PaginationComp = ({ currentPage, maxPages, setPageAndShownPuppies }) => {
  const changePage = (action) => {
    if (typeof action === 'string') {
      action === 'next'
        ? setPageAndShownPuppies(currentPage + 1)
        : setPageAndShownPuppies(currentPage - 1)
    } else {
      setPageAndShownPuppies(action)
    }
  }

  return (
    <>
      {maxPages !== 0 && (
        <div
          className={`${styles.paginationContainer} w-100 d-flex flex-row justify-content-center align-items-center mb-5 gap-3`}
        >
          <div
            className={`${
              styles.nextPagination
            } d-flex flex-row justify-content-center align-items-center ${
              currentPage === 1
                ? styles.disablePagination
                : styles.activePagination
            }`}
            onClick={() => changePage('prev')}
          >
            <BsArrowLeftCircle />
            <p className='mb-0 ms-2'>Prev</p>
          </div>
          <div
            className={`${maxPages === 1 ? 'invisible' : ''} ${
              styles.pageNumPagination
            } ${
              styles.activePagination
            } d-flex flex-row justify-content-center align-items-center gap-3 `}
          >
            {pageNumberToShow(currentPage, maxPages).map((num, index) => (
              <p
                role='button'
                className={`${currentPage === num ? 'active-number' : ''} mb-0`}
                key={index}
                onClick={() => changePage(num)}
              >
                {num}
              </p>
            ))}
          </div>
          <div
            className={`${
              styles.nextPagination
            } d-flex flex-row justify-content-center align-items-center ${
              currentPage === maxPages
                ? styles.disablePagination
                : styles.activePagination
            }`}
            onClick={() => changePage('next')}
          >
            <p className='mb-0 me-2'>Next</p>
            <BsArrowRightCircle />
          </div>
        </div>
      )}
    </>
  )
}

export default PaginationComp
