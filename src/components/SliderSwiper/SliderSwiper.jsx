import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

const SlideSwiper = ({ children }) => {
  const options = {
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    spaceBetween: 20,
    className: 'testimonial-slider',
  }

  return (
    <Swiper {...options}>
      {children.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SlideSwiper
