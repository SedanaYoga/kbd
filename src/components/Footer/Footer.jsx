import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <Container className="p-5 h-100">
        <Row className="h-100">
          <Col className="d-flex flex-column justify-content-between">
            <h3 className="pe-4">
              consectetur adipiscing elit. consectetur adipiscing elit.
            </h3>
            <p>Group 1 Copyright 2022</p>
          </Col>
          <Col className="h-100 d-flex flex-row justify-content-center align-items-start">
            <div>
              <h5 className="mb-3">consectetur</h5>
              <ul className={styles.sosmedUl}>
                <li>
                  <div className={styles.dummyLogo}></div>
                  consectetur
                </li>
                <li>
                  <div className={styles.dummyLogo}></div>
                  consectetur
                </li>
                <li>
                  <div className={styles.dummyLogo}></div>
                  consectetur
                </li>
                <li>
                  <div className={styles.dummyLogo}></div>
                  consectetur
                </li>
              </ul>
            </div>
          </Col>
          <Col className="d-flex flex-column justify-content-lg-start justify-content-center align-items-lg-start align-items-center">
            <h5 className="mb-2">consectetur</h5>
            <div className={styles.dummyMap}></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
