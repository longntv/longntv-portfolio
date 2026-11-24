import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillMail,
} from "react-icons/ai";
import { FaLinkedinIn, FaStackOverflow } from "react-icons/fa";

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
              I’m a backend-focused developer who loves building scalable and maintainable systems. 💻❤️
              <br />
              <br />
              Specializing in <b className="primary"> Golang </b>, I design clean architectures using <b className="primary">Domain-Driven Design (DDD) and microservices </b>. 
              I’ve built RESTful APIs, GraphQL endpoints, and event-driven systems that enable efficient service communication.
              <br />
              <br />
              I’m also experienced in <b className="primary">IIoT applications</b>, using MQTT and WebSockets for real-time data and device communication,
              implemented solutions that combine <b className="primary">edge computing</b> with cloud integration, backed by a solid understanding of IoT protocols.
              <br />
              <br />
              I have a strong background in <b className="primary">DevOps</b> practices, including CI/CD pipelines and infrastructure as code. I am proficient in using tools like
              <b className="primary"> Terraform</b> to automate deployment and configuration management, ensuring consistent and reliable environments.
              <br />
              <br />
              Whenever possible, I bring my passion for <b className="primary">Golang</b> into building scalable, maintainable systems — 
              and I’m always excited to explore new technologies and architectural patterns.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid"  alt="avatar" style={{ maxHeight: "400px", objectFit: "contain" }}/>
            </Tilt>
          </Col>
        </Row>
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
