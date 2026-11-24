import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { AiOutlineRead } from "react-icons/ai";
import { useStore } from "../../lib/store";
import { EImage, EText, ETags, ItemControls } from "../Edit/Editable";

function ProjectCards({ project: p }) {
  const { editMode, updateItem } = useStore();
  const save = (field) => (v) => updateItem("projects", p.id, { [field]: v });
  const detail = `/project/${p.slug}`;
  return (
    <Card className="project-card-view editable-item">
      <ItemControls collection="projects" item={p} label="project" />
      <EImage src={p.cover} onSave={save("cover")} alt="card-img" className="card-img-top" />
      <Card.Body>
        <Card.Title>
          {editMode ? (
            <EText value={p.title} placeholder="Title" onSave={save("title")} />
          ) : (
            <Link to={detail} className="project-title-link">{p.title}</Link>
          )}
        </Card.Title>
        <Card.Text as="div" style={{ textAlign: "justify" }}>
          <EText as="p" multiline value={p.summary} placeholder="Short summary" onSave={save("summary")} />
        </Card.Text>
        <ETags tags={p.tags} onSave={save("tags")} />
        {editMode && (
          <div className="card-edit-fields">
            <div>Category:{" "}
              <select value={p.category || "work"} onChange={(e) => updateItem("projects", p.id, { category: e.target.value })}>
                <option value="work">Work project</option>
                <option value="side">Side project</option>
              </select>
            </div>
            <div>GitHub: <EText value={p.github} placeholder="https://github.com/…" onSave={save("github")} /></div>
            <div>Demo: <EText value={p.demo} placeholder="https://…" onSave={save("demo")} /></div>
          </div>
        )}
        <Button variant="primary" as={Link} to={detail}>
          <AiOutlineRead /> &nbsp;Details
        </Button>
        {!editMode && p.github && (
          <Button variant="primary" href={p.github} target="_blank" style={{ marginLeft: "10px" }}>
            <BsGithub /> &nbsp;GitHub
          </Button>
        )}
        {!editMode && p.demo && (
          <Button variant="primary" href={p.demo} target="_blank" style={{ marginLeft: "10px" }}>
            <CgWebsite /> &nbsp;Demo
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
