import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MdSecurity } from "react-icons/md";
import { FaAws, FaRobot, FaMicrochip, FaProjectDiagram } from "react-icons/fa";
import { SiTerraform } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";

const areas = [
  {
    icon: MdSecurity,
    title: "Security in ADLC",
    text: "Security pipeline and workflow: security review, pre-release pentesting, human-in-the-loop approval, best-practice design patterns enforced by skill-based guardrails.",
  },
  {
    icon: FaProjectDiagram,
    title: "Micro-services",
    text: "Go, Domain-Driven Design, gRPC / GraphQL / REST, monorepo, zero-trust service-to-service auth.",
  },
  {
    icon: FaAws,
    title: "AWS",
    text: "Lambda, S3, DynamoDB, SQS/SNS, EventBridge, RDS, OpenSearch, Bedrock, IoT Core.",
  },
  {
    icon: FaRobot,
    title: "AI",
    text: "Designed and built a RAG MVP on Amazon Bedrock for document search and knowledge retrieval.",
  },
  {
    icon: FaMicrochip,
    title: "IoT",
    text: "Platforms ingesting millions of sensor readings, with real-time monitoring across 13+ device types.",
  },
  {
    icon: SiTerraform,
    title: "Infrastructure as code",
    text: "Terraform, Docker, Kubernetes, GitHub Actions.",
  },
];

function Focus() {
  return (
    <div className="focus-section">
      <h1 className="project-heading">
        What I work with <strong className="primary">day to day</strong>
      </h1>
      <Row style={{ justifyContent: "center" }}>
        {areas.map(({ icon: Icon, title, text }) => (
          <Col md={4} className="project-card" key={title}>
            <Card className="project-card-view focus-card">
              <Card.Body>
                <Icon className="focus-icon" />
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <p className="focus-beyond">
        <b className="primary">Beyond code:</b> I lead project delivery, run
        technical interviews, and mentor new engineers through onboarding.
      </p>
      <div className="focus-cta">
        <p>
          Open to <b className="primary">Senior Back-end</b> and{" "}
          <b className="primary">Technical Lead</b> roles, especially teams
          building secure, AI-driven development workflows.
        </p>
        <Button variant="primary" href="mailto:longntv@gmail.com">
          <AiOutlineMail /> &nbsp;longntv@gmail.com
        </Button>
      </div>
    </div>
  );
}

export default Focus;
