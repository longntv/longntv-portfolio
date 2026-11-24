import React from "react";
import { Col, Row } from "react-bootstrap";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-invert ci-datadog"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-invert ci-sentry"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-prometheus"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-terraform"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-kubernetes"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-docker"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-githubactions"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-git-horizontal"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-invert ci-aws"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-azure"></i>
      </Col>
    </Row>
  );
}

export default Toolstack;
