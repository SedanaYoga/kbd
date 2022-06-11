import { showNotif, clearNotif } from '../redux/slices/notifSlice'

const errorMapping = new Map([
  [
    'Firebase: Error (auth/user-not-found).',
    'Ensure your email has already registered',
  ],
  [
    'Firebase: Error (auth/popup-closed-by-user).',
    'Pop-Up sign in was closed by user',
  ],
  ['Firebase: Error (auth/invalid-email).', 'Please use a valid email'],
  [
    'Firebase: Error (auth/internal-error).',
    'Something went wrong, please check your input!',
  ],
])

export const notifHandler = (dispatch, message, type = 'error') => {
  let notifMessage = type !== 'error' ? message : type === 'error' && errorMapping.get(message) ? errorMapping.get(message) : message
  dispatch(showNotif({ message: notifMessage, type }))
  setTimeout(() => {
    dispatch(clearNotif())
  }, 5000)
}
