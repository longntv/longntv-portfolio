import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="primary">Long Nguyen </span>
            from <span className="primary"> Ho Chi Minh City, Vietnam.</span>
            <br />
            <br />
            I’m a backend developer with a passion for building scalable, maintainable systems and cloud-native applications.
            <br />
            <br />
            Currently, I’m working as a software developer, focused on <span className="primary"> Golang, microservices, and clean architecture (DDD). </span>
            <br />
            <br />
            I also have hands-on experience in building IIoT solutions and integrating edge computing with cloud services.
            <br />
            <br />
            Beyond software development, I’m also interested in:
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
