import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import Socials from "../Socials";
import { useStore } from "../../lib/store";
import { EImage, EMarkdown } from "../Edit/Editable";

function Home2() {
  const { site, saveSite } = useStore();
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <div className="home-about-body">
              <EMarkdown value={site.intro} onSave={(intro) => saveSite({ intro })} />
            </div>
          </Col>
          <Col md={4} className="myAvtar">
            <EImage
              src={site.avatar}
              fallback={myImg}
              className="img-fluid"
              alt="avatar"
              onSave={(avatar) => saveSite({ avatar })}
            >
              {(img) => <Tilt>{img}</Tilt>}
            </EImage>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <Socials
              editable
              listClassName="home-about-social-links"
              linkClassName="icon-colour  home-social-icons"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
