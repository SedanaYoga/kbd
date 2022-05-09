import Link from "next/link";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "./Navbar.module.scss";

const NavBar = () => {
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
            <div className="d-flex flex-lg-row flex-column gap-lg-2 gap-0 flex-grow-1 justify-content-end">
              <Link href="/">
                <a>home</a>
              </Link>
              <Link href="/aboutus">
                <a>about us</a>
              </Link>
              <Link href="/browse">
                <a>browse</a>
              </Link>
            </div>
            <div className="d-flex flex-lg-row flex-column flex-grow-1 justify-content-end">
              <Link href="/login">
                <a>login</a>
              </Link>
              <Link href="/register">
                <a>register</a>
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
