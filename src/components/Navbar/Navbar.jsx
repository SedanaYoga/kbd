import Link from 'next/link'
import { useRouter } from 'next/router'
import { Navbar, Nav, Container } from 'react-bootstrap'
import styles from './Navbar.module.scss'
import { capitalizeFirst } from '../../helper/textHelper'
import BtnComp from '../BtnComp/BtnComp'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, login } from '../../redux/slices/userSlice'
import { onIdTokenChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase.init'

const menu = {
  main: ['home', 'about us', 'browse'],
  auth: ['log in', 'register'],
}
const NavBar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const currentPath = router.pathname.split('/')[1]
  const { user } = useSelector((state) => state.user)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        dispatch(logout())
      } else {
        dispatch(
          login({
            email: user.email,
            token: await user.getIdToken(),
            uid: user.uid,
          }),
        )
      }
    })
  }, [])

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    // clean up setInterval
    return () => clearInterval(handle)
  }, [])

  const logoutHandler = async () => {
    await signOut(auth)
    dispatch(logout())
  }

  return (
    <Navbar expand='lg' className={styles.navBar}>
      <Container>
        <Link href='/'>
          <a className={`nav-brand ${styles.navBar__brand}`}>
            <img role='button' src='/images/logo.png' alt='logo' />
          </a>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav '>
          <Nav
            className={`me-auto w-100 d-flex justify-content-between ${styles.navBar__menu}`}>
            <div
              className={`${styles.navBar__menu_main} d-flex flex-lg-row flex-column gap-lg-2 mt-3 mt-lg-0 gap-0 flex-grow-1 justify-content-end align-items-end`}>
              {menu.main.map((mainMenu, index) => (
                <Link
                  key={index}
                  href={`/${
                    mainMenu === 'home' ? '' : mainMenu.replace(' ', '')
                  }`}>
                  <a
                    className={`${
                      currentPath ===
                      `${mainMenu === 'home' ? '' : mainMenu.replace(' ', '')}`
                        ? styles.active
                        : ''
                    }`}>
                    {mainMenu}
                  </a>
                </Link>
              ))}
            </div>
            <div className='d-flex flex-lg-row flex-column flex-grow-1 justify-content-end'>
              {!user ? (
                menu.auth.map((authMenu, index) => (
                  <Link
                    key={index}
                    href={`/${authMenu.replace(' ', '')}`}
                    passHref>
                    <BtnComp
                      type={`${
                        authMenu === 'register' ? 'primary' : 'secondary'
                      }`}
                      margin='0 0 0 1rem'
                      padding='0.5rem 1rem'>
                      {capitalizeFirst(authMenu)}
                    </BtnComp>
                  </Link>
                ))
              ) : (
                <div className={styles.authMenu}>
                  <div onClick={() => setShowDropdown((prev) => !prev)}>
                    <p>Welcome, {user.email}</p>
                  </div>
                  <div
                    className={`${showDropdown ? styles.dropdownShown : ''} ${
                      styles.authMenuToggle
                    }`}>
                    <div>
                      <Link href={`/profile/${user.uid}`}>
                        <a>Profile</a>
                      </Link>
                    </div>
                    <div onClick={logoutHandler}>
                      <p>Logout</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
