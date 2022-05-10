import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "./Navbar.module.scss";
import { capitalizeFirst } from "../../helper/textHelper";

const menu = {
  main: ["home", "about us", "browse"],
  auth: ["log in", "register"],
};
const NavBar = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <Navbar expand="lg" className={styles.navBar}>
      <Container>
        <Link href="/">
          <a className={`nav-brand ${styles.navBar__brand}`}>
            <img role="button" src="/images/logo.png" alt="logo" />
          </a>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav
            className={`me-auto w-100 d-flex justify-content-between ${styles.navBar__menu}`}
          >
            <div className="d-flex flex-lg-row flex-column gap-lg-2 mt-3 mt-lg-0 gap-0 flex-grow-1 justify-content-end align-items-end">
              {menu.main.map((mainMenu, index) => (
                <Link
                  key={index}
                  href={`/${mainMenu === "home" ? "" : mainMenu}`}
                >
                  <a
                    className={
                      currentPath === `/${mainMenu === "home" ? "" : mainMenu}`
                        ? styles.active
                        : ""
                    }
                  >
                    {mainMenu}
                  </a>
                </Link>
              ))}
            </div>
            <div className="d-flex flex-lg-row flex-column flex-grow-1 justify-content-end">
              {menu.auth.map((authMenu, index) => (
                <Link key={index} href={`/${authMenu.replace(" ", "")}`}>
                  <a
                    className={`btn ${
                      authMenu === "register" ? styles.register : styles.login
                    } ${styles.authButton}`}
                  >
                    {capitalizeFirst(authMenu)}
                  </a>
                </Link>
              ))}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
