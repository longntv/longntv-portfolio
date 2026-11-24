import React from "react";
import { Col, Row } from "react-bootstrap";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-invert ci-datadog"></i>
        <div className="tech-label">Datadog</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-invert ci-sentry"></i>
        <div className="tech-label">Sentry</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-prometheus"></i>
        <div className="tech-label">Prometheus</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-terraform"></i>
        <div className="tech-label">Terraform</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-kubernetes"></i>
        <div className="tech-label">Kubernetes</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-docker"></i>
        <div className="tech-label">Docker</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-githubactions"></i>
        <div className="tech-label">GitHub Actions</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-git-horizontal"></i>
        <div className="tech-label">Git</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-invert ci-aws"></i>
        <div className="tech-label">AWS</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <i class="ci ci-8x ci-azure"></i>
        <div className="tech-label">Azure</div>
      </Col>
    </Row>
  );
}

export default Toolstack;
