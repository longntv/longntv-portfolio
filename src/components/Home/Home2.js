import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
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
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="primary"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I set up the security pipeline and workflow for an{" "}
              <b className="primary">AI-driven development lifecycle (ADLC)</b> — so
              code written with AI is checked for security in review and pentested
              before release, with a <b className="primary">human in the loop at every gate</b>.
              <br />
              <br />
              I’m leading my team’s move from a standard SDLC to ADLC:{" "}
              <b className="primary">PRP specs feed Claude Code</b> implementation, and
              custom skills act as guardrails that apply best-practice design patterns
              to code, review and test. Security is part of the same workflow —
              security checks in code review, pentesting before release, and an
              engineer approving each step rather than the AI shipping on its own.
              <br />
              <br />
              <b className="primary">Fifteen years in software</b>: the last five on{" "}
              <b className="primary">Golang micro-services and AWS</b>, the earlier ones
              on <b className="primary">embedded systems and industrial IoT platforms</b>.
              That combination is the useful part. I can follow a sensor reading from
              the device all the way to the dashboard, and design each layer knowing
              what the next one actually needs.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid"  alt="avatar" style={{ maxHeight: "400px", objectFit: "contain" }}/>
            </Tilt>
          </Col>
        </Row>
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
