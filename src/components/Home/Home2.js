import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiFillMail,
} from "react-icons/ai";
import { FaLinkedinIn, FaStackOverflow } from "react-icons/fa";
import Focus from "./Focus";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <div className="intro-block">
          <h1 className="project-heading">
            Why teams <strong className="primary">hire me</strong>
          </h1>
          <p className="intro-lead">
            I can follow a sensor reading from the firmware on an industrial device all the
            way to the dashboard, and I design every layer knowing what the next one needs.
          </p>
          <p className="intro-body">
            <b className="primary">15 years in software</b>: the last five building{" "}
            <b className="primary">Golang micro-services on AWS</b>, the ten before that on{" "}
            <b className="primary">embedded systems and industrial IoT platforms</b>. Beyond
            code, I lead project delivery, run technical interviews, and mentor new engineers
            through onboarding.
          </p>
        </div>
        <Focus />
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="primary">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/longntv"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/long-ntv"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://stackoverflow.com/users/8244515/long-ntv"
                  style={{ color: "white" }}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaStackOverflow />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="mailto:longntv@gmail.com"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillMail />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
