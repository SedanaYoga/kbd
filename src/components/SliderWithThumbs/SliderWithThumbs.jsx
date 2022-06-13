import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import { useState } from 'react'
import { fileNameToExtension } from '../../helper/textHelper'
// import styles from './SliderWithThumbs.module.scss'

const ProductImagesSlider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState()
  console.log(images.at(-1))

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
            {index === images.length - 1 && fileNameToExtension(item.fileNameOnUpload).extension === 'mp4' ?
              <video controls>
                <source src={item.downloadUrl}
                  type="video/mp4" />
              </video>
              :
              <Image src={item.downloadUrl} alt='product images' layout='fill' />
            }
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
              {index === images.length - 1 && fileNameToExtension(item.fileNameOnUpload).extension === 'mp4' ?
                <video muted>
                  <source src={item.downloadUrl}
                    type="video/mp4" />
                </video>
                :
                <Image src={item.downloadUrl} alt='product images' layout='fill' />
              }
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default ProductImagesSlider
