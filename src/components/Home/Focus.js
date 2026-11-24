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
    tags: ["Security review", "Pre-release pentest", "Human-in-the-loop", "Skill guardrails"],
  },
  {
    icon: FaProjectDiagram,
    title: "Micro-services",
    tags: ["Go", "DDD", "gRPC", "GraphQL", "REST", "Zero-trust auth"],
  },
  {
    icon: FaAws,
    title: "AWS",
    tags: ["Lambda", "DynamoDB", "SQS / SNS", "EventBridge", "RDS", "OpenSearch", "IoT Core"],
  },
  {
    icon: FaRobot,
    title: "AI",
    tags: ["Amazon Bedrock", "RAG", "Claude Code", "PRP specs"],
  },
  {
    icon: FaMicrochip,
    title: "IoT",
    tags: ["Millions of readings", "13+ device types", "Real-time monitoring", "Embedded"],
  },
  {
    icon: SiTerraform,
    title: "Infrastructure as code",
    tags: ["Terraform", "Docker", "Kubernetes", "GitHub Actions"],
  },
];

function Focus() {
  return (
    <div className="focus-section">
      <h1 className="project-heading">
        What I work with <strong className="primary">day to day</strong>
      </h1>
      <Row style={{ justifyContent: "center" }}>
        {areas.map(({ icon: Icon, title, tags }) => (
          <Col md={4} className="project-card" key={title}>
            <Card className="project-card-view focus-card">
              <Card.Body>
                <div className="focus-head">
                  <Icon className="focus-icon" />
                  <Card.Title>{title}</Card.Title>
                </div>
                <div className="chips">
                  {tags.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
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
