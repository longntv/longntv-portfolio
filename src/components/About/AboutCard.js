import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            Hi Everyone, I am <span className="primary">Long Nguyen </span>
            from <span className="primary"> Ho Chi Minh City, Vietnam.</span>
            <br />
            <br />
            I’m a <span className="primary">Senior Back-end Engineer and Technical Lead</span> who
            can follow a sensor reading from the firmware on an industrial device all the way to
            the dashboard: <span className="primary">15 years</span> across{" "}
            <span className="primary">embedded systems and industrial IoT</span>, the last five
            building <span className="primary">Golang micro-services on AWS</span>.
          </p>
          <p className="adlc-callout">
            Today I’m leading my team’s move to an{" "}
            <span className="primary">AI-driven development lifecycle (ADLC)</span>, with a security
            pipeline that reviews and pentests AI-written code before release and keeps{" "}
            <span className="primary">an engineer approving every step</span>.
          </p>
          <p>
            Beyond code, I lead project delivery, run technical interviews, and mentor new engineers
            through onboarding.
            <br />
            <br />
            Outside of work, I enjoy:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Running
            </li>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Traveling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Building systems that solve real-world problems!"{" "}
          </p>
          <footer className="blockquote-footer">Long Nguyen</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
