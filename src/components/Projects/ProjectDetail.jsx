import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Particle from "../Particle";
import { useStore } from "../../lib/store";
import { EImage, EMarkdown, EText, ETags } from "../Edit/Editable";

function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { content, editMode, updateItem } = useStore();
  const p = content.projects.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/project" replace />;

  const save = (field) => (v) => updateItem("projects", p.id, { [field]: v });
  const saveSlug = async (v) => {
    const item = await updateItem("projects", p.id, { slug: v });
    navigate(`/project/${item.slug}`, { replace: true });
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container className="project-detail">
        <Link to="/project" className="project-back">
          <AiOutlineArrowLeft /> All projects
        </Link>
        <h1 className="project-heading">
          <EText className="purple" value={p.title} placeholder="Title" onSave={save("title")} />
        </h1>
        {editMode && (
          <p className="project-slug">
            URL: /project/<EText value={p.slug} onSave={saveSlug} />
          </p>
        )}
        <p className="project-meta">
          <EText value={p.role} placeholder="Your role" onSave={save("role")} />
          {p.role && p.period && " · "}
          <EText value={p.period} placeholder="Period" onSave={save("period")} />
        </p>
        <ETags tags={p.tags} onSave={save("tags")} />
        <div className="project-links">
          {p.github && (
            <Button variant="primary" href={p.github} target="_blank">
              <BsGithub /> &nbsp;GitHub
            </Button>
          )}
          {p.demo && (
            <Button variant="primary" href={p.demo} target="_blank">
              <CgWebsite /> &nbsp;Demo
            </Button>
          )}
        </div>
        <div className="project-cover">
          <EImage src={p.cover} alt={p.title} className="img-fluid" onSave={save("cover")} />
        </div>
        <EText as="p" multiline className="project-summary" value={p.summary} placeholder="Short summary" onSave={save("summary")} />
        <div className="project-body">
          <EMarkdown value={p.body} placeholder="Write the full project story (Markdown, paste images)" onSave={save("body")} />
        </div>
      </Container>
    </Container>
  );
}

export default ProjectDetail;
