import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import { useState } from 'react'
// import styles from './SliderWithThumbs.module.scss'

const ProductImagesSlider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState()

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className='product-images-slider'>
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.downloadUrl} alt='product images' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        modules={[Navigation, Thumbs]}
        className='product-images-slider-thumbs'>
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='product-images-slider-thumbs-wrapper'>
              <img src={item.downloadUrl} alt='product images' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default ProductImagesSlider
