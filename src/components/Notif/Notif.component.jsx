import { Container } from 'react-bootstrap'

const Notif = ({ message }) => {
  return (
    <Container className='d-flex flex-row justify-content-center align-items-center bg-danger rounded p-3 mt-3'>
      <p className='mb-0 text-white text-center'>{message}</p>
    </Container>
  )
}

export default Notif