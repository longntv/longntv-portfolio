import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ProjectCard from "../Projects/ProjectCards";
import { useStore } from "../../lib/store";

function FeaturedProjects() {
  const { content } = useStore();
  const featured = content.projects.filter((p) => p.featured);
  if (!featured.length) return null;
  return (
    <Container fluid className="home-about-section">
      <Container>
        <h1 className="project-heading">
          Featured <strong className="purple">Projects</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {featured.map((p) => (
            <Col md={4} className="project-card" key={p.id}>
              <ProjectCard project={p} />
            </Col>
          ))}
        </Row>
        <Button variant="primary" as={Link} to="/project">
          All projects
        </Button>
      </Container>
    </Container>
  );
}

export default FeaturedProjects;
