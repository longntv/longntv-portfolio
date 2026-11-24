import React from "react";
import { Col, Row } from "react-bootstrap";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-golang-wordmark"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-cpp"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-embeddedc"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-nodejs"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-typescript"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-vuejs"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-reactnative"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-invert ci-mysql"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-dynamodb"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-redis"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-grpc"></i>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-graphql"></i>
      </Col>
    </Row>
  );
}

export default Techstack;
