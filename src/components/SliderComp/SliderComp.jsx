import Slider from 'react-slick'

const SliderComp = ({ children, className, variableWidth, centerMode }) => {
  const setting = {
    dots: false,
    arrows: false,
    infinite: children.length > 3,
    variableWidth: variableWidth,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    easing: 'ease-in-out',
    centerMode: centerMode,
  }
  return (
    <div className={className}>
      <Slider {...setting}>{children}</Slider>
    </div>
  )
}

export default SliderComp

SliderComp.defaultProps = {
  variableWidth: true,
  centerMode: false,
}
