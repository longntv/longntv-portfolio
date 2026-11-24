import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import Button from "react-bootstrap/Button";
import { AiOutlineMail } from "react-icons/ai";
import Toolstack from "./Monitoring";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              About <strong className="primary">me</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <div className="facts-card">
              <dl>
                <dt>Based in</dt>
                <dd>Ho Chi Minh City, Vietnam</dd>
                <dt>Role</dt>
                <dd>Senior Back-end Engineer · Technical Lead</dd>
                <dt>Experience</dt>
                <dd>15 years: embedded and industrial IoT, then Go micro-services on AWS</dd>
                <dt>Current focus</dt>
                <dd>Secure AI-driven development lifecycle (ADLC)</dd>
                <dt>Open to</dt>
                <dd>Senior Back-end and Technical Lead roles</dd>
              </dl>
              <Button variant="primary" href="mailto:longntv@gmail.com">
                <AiOutlineMail /> &nbsp;Get in touch
              </Button>
            </div>
          </Col>
        </Row>
        <h1 className="project-heading">
          Professional <strong className="primary"> Techstack </strong>
        </h1>

        <Techstack />

        <h1 className="project-heading">
          <strong className="primary">DevOps & Cloud Infrastructure</strong>
        </h1>
        <Toolstack />

        <Github />
      </Container>
    </Container>
  );
}

export default About;
