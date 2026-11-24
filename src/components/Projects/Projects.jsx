import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { useStore } from "../../lib/store";
import { AddButton } from "../Edit/Editable";

const newProject = (category) => ({
  title: "New project",
  category,
  summary: "",
  role: "",
  period: "",
  tags: [],
  cover: "",
  github: "",
  demo: "",
  body: "",
});

function ProjectGroup({ projects, category, children }) {
  const { editMode } = useStore();
  const list = projects.filter((p) => (p.category || "work") === category);
  if (!list.length && !editMode) return null;
  return (
    <>
      {children}
      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        {list.map((p) => (
          <Col md={4} className="project-card" key={p.id}>
            <ProjectCard project={p} />
          </Col>
        ))}
      </Row>
      <AddButton
        collection="projects"
        label={category === "side" ? "Add side project" : "Add project"}
        data={newProject(category)}
      />
    </>
  );
}

function Projects() {
  const { content } = useStore();
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <ProjectGroup projects={content.projects} category="work">
          <h1 className="project-heading">
            My Recent <strong className="purple">Works </strong>
          </h1>
          <p style={{ color: "white" }}>
            Here are a few projects I've worked on recently.
          </p>
        </ProjectGroup>
        <ProjectGroup projects={content.projects} category="side">
          <h1 className="project-heading" style={{ paddingTop: "30px" }}>
            Side <strong className="purple">Projects </strong>
          </h1>
        </ProjectGroup>
      </Container>
    </Container>
  );
}

export default Projects;
