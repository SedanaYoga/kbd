import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

export default ({ children }) => {
  const options = {
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    spaceBetween: 20,
  }

  return (
    <Swiper {...options}>
      {children.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  )
}
