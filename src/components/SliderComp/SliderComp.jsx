import Slider from 'react-slick'

const SliderComp = ({ children, className }) => {
  const setting = {
    dots: false,
    arrows: false,
    infinite: children.length > 3,
    variableWidth: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    easing: 'ease-in-out',
  }
  return (
    <div className={className}>
      <Slider {...setting}>{children}</Slider>
    </div>
  )
}

export default SliderComp
