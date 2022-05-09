import Head from "next/head";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import UserLayout from "../components/Layouts/UserLayout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home - Kinta-Bali Dog</title>
        <meta
          name="description"
          content="Kintamani-Bali Dog adoption platform"
        />
      </Head>
      <Container className="heroContainer">
        <Row className="h-100">
          <Col className="col-lg-6  d-flex flex-row align-items-center justify-content-start">
            <div>
              <h1 className="pe-5 fw-bold">Find Your Forever Soulmate</h1>
              <p className="mt-3 fs-3">
                consectetur adipiscing elit. consectetur adipiscing elit.
              </p>
              <Link href="/browse">
                <Button variant="button" size="lg">
                  Browse our best puppies
                </Button>
              </Link>
            </div>
          </Col>
          <Col className="col-lg-6  d-flex flex-row align-items-center justify-content-start">
            <div>
              <img
                className="heroImage"
                src="/images/hero-image.jpg"
                height={500}
                alt="kintamani-dog"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>;
};
