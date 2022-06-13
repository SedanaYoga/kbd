import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Navbar, Nav, Container } from 'react-bootstrap'
import styles from './Navbar.module.scss'
import { capitalizeFirst } from '../../helper/textHelper'
import BtnComp from '../BtnComp/BtnComp'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, login, setUserState } from '../../redux/slices/userSlice'
import { onIdTokenChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase.init'
import { clearRegInput } from '../../redux/slices/registerSlice'
import { setCookie } from 'nookies'
import {
  getBiodata,
} from '../../firebase/firebase.utils'
import { setRegInput } from '../../redux/slices/registerSlice'

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
  const [isAdmin, setIsAdmin] = useState(false)

  const checkGoogleBiodata = useCallback(async (email, result) => {
    const biodata = await getBiodata(email)

    const dataCaptureLogic = biodata?.phoneNumber ? true : false
    setCookie(undefined, 'email', email)
    dispatch(setUserState({ email: email }))

    if (biodata.isAdmin) {
      setIsAdmin(true)
    } else setIsAdmin(false)

    if (!dataCaptureLogic) {
      setCookie(undefined, 'regInput', email)
      dispatch(setRegInput({ email: email }))
    } else {
      dispatch(setUserState(result))
      dispatch(login())
    }
  }, [dispatch])

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        dispatch(logout())
      } else {
        const token = await user.getIdToken()
        await checkGoogleBiodata(user.email, {
          email: user.email,
          token,
          uid: user.uid,
        })
      }
    })
  }, [checkGoogleBiodata, dispatch])

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
    dispatch(clearRegInput())
    setShowDropdown(false)
    router.push('/')
  }

  return (
    <Navbar expand='lg' className={styles.navBar}>
      <Container>
        <Link href='/'>
          <a className={`nav-brand ${styles.navBar__brand}`}>
            <Image role='button' src='/images/logo.png' alt='logo' width={40} height={40} />
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
                  href={`/${mainMenu === 'home' ? '' : mainMenu.replace(' ', '')
                    }`}>
                  <a
                    className={`${currentPath ===
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
                      type={`${authMenu === 'register' ? 'primary' : 'secondary'
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
                    <p>
                      Welcome,{' '}
                      {user.firstName
                        ? `${user.firstName} ${user.lastName}`
                        : user.email}
                    </p>
                  </div>
                  <div
                    className={`${showDropdown ? styles.dropdownShown : ''} ${styles.authMenuToggle
                      }`}>
                    {isAdmin &&
                      <div>
                        <Link href='/dashboard'>
                          <a>Dashboard</a>
                        </Link>
                      </div>
                    }
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
