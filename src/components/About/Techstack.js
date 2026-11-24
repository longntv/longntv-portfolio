import React from "react";
import { Col, Row } from "react-bootstrap";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-golang-wordmark"></i>
        <div className="tech-label">Go</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-cpp"></i>
        <div className="tech-label">C++</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-embeddedc"></i>
        <div className="tech-label">Embedded C</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-nodejs"></i>
        <div className="tech-label">Node.js</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-typescript"></i>
        <div className="tech-label">TypeScript</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-vuejs"></i>
        <div className="tech-label">Vue.js</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-reactnative"></i>
        <div className="tech-label">React Native</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-invert ci-mysql"></i>
        <div className="tech-label">MySQL</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-dynamodb"></i>
        <div className="tech-label">DynamoDB</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-redis"></i>
        <div className="tech-label">Redis</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-grpc"></i>
        <div className="tech-label">gRPC</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-graphql"></i>
        <div className="tech-label">GraphQL</div>
      </Col>
    </Row>
  );
}

export default Techstack;
