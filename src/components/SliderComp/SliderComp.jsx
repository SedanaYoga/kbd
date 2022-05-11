import Slider from 'react-slick'

const SliderComp = ({ children }) => {
  const setting = {
    dots: false,
    infinite: children.length > 3,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out',
  }
  return (
    <div>
      <Slider {...setting}>{children}</Slider>
    </div>
  )
}

export default SliderComp
