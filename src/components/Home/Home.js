import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineFundProjectionScreen } from "react-icons/ai";
import myImg from "../../Assets/avatar.png";
import Particle from "../Particle";
import Home2 from "./Home2";
import AdlcPipeline from "./AdlcPipeline";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center">
            <Col md={5} className="order-2 order-md-1 hero-photo-col">
              <div className="hero-photo">
                <img src={myImg} alt="Long Nguyen" />
                <div className="hero-badge hero-badge-top">
                  <span>Experience</span>
                  <strong>15 years</strong>
                </div>
                <div className="hero-badge hero-badge-bottom">
                  <span>Focus</span>
                  <strong>Secure ADLC</strong>
                </div>
              </div>
            </Col>
            <Col md={7} className="order-1 order-md-2">
              <p className="hero-eyebrow">Senior Back-end Engineer · Technical Lead</p>
              <h1 className="hero-name">
                Long <span className="primary">Nguyen</span>
              </h1>
              <p className="hero-headline">
                I lead teams shipping AI-written code that is{" "}
                <span className="primary">reviewed, pentested and human-approved</span>{" "}
                before it reaches production.
              </p>
              <p className="hero-pitch">
                Today I’m leading my team’s move to an{" "}
                <strong className="primary">AI-driven development lifecycle (ADLC)</strong>,
                with a security pipeline that reviews and pentests AI-written code before
                release and keeps <strong className="primary">an engineer approving every step</strong>.
              </p>
              <div className="hero-actions">
                <Button variant="primary" href="mailto:longntv@gmail.com">
                  <AiOutlineMail /> &nbsp;Get in touch
                </Button>
                <Button variant="outline-light" as={Link} to="/project">
                  <AiOutlineFundProjectionScreen /> &nbsp;See projects
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <AdlcPipeline />
      <Home2 />
    </section>
  );
}

export default Home;
