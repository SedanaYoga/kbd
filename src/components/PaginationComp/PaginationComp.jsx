import React from 'react'
import styles from './PaginationComp.module.scss'
import { BsArrowLeftCircle, BsArrowRightCircleFill } from 'react-icons/bs'
import { pageNumberToShow } from '../../helper/textHelper'

const PaginationComp = ({ currentPage, maxPages, setPageAndShownBooks }) => {

  const changePage = (action) => {
    if (typeof action === 'string') {
      action === 'next'
        ? setPageAndShownBooks(currentPage + 1)
        : setPageAndShownBooks(currentPage - 1)
    } else {
      setPageAndShownBooks(action)
    }
  }

  return (
    <>
      {maxPages !== 0 && (
        <div
          className={`${styles.paginationContainer} w-100 d-flex flex-row justify-content-center align-items-center mb-5 gap-3`}
        >
          <div
            className={`${styles.nextPagination} d-flex flex-row justify-content-center align-items-center ${currentPage === 1 ? styles.disablePagination : styles.activePagination
              }`}
            onClick={() => changePage('prev')}
          >
            <BsArrowLeftCircle />
            <p>Prev</p>
          </div>
          <div
            className={`${maxPages === 1 ? styles.invisible : ''
              } ${styles.pageNumPagination} ${styles.activePagination} d-flex flex-row justify-content-center align-items-center gap-3 `}
          >
            {pageNumberToShow(currentPage, maxPages).map((num, index) => (
              <p
                role='button'
                className={currentPage === num ? 'active-number' : ''}
                key={index}
                onClick={() => changePage(num)}
              >
                {num}
              </p>
            ))}
          </div>
          <div
            className={`prev-pagination d-flex flex-row justify-content-center align-items-center ${currentPage === maxPages
              ? 'disable-pagination'
              : 'active-pagination'
              }`}
            onClick={() => changePage('next')}
          >
            <p>Next</p>
            <BsArrowRightCircleFill />
          </div>
        </div>
      )}
    </>
  )
}

export default PaginationComp
