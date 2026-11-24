import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useStore } from "../../lib/store";
import { AddButton, EText, ItemControls } from "../Edit/Editable";

function Certifications() {
  const { content, editMode, updateItem } = useStore();
  if (!content.certifications.length && !editMode) return null;
  const save = (id, field) => (v) => updateItem("certifications", id, { [field]: v });
  return (
    <>
      <h1 className="project-heading">
        <strong className="purple">Certifications</strong>
      </h1>
      <Row style={{ justifyContent: "center", paddingBottom: "40px" }}>
        {content.certifications.map((c) => (
          <Col md={4} className="project-card" key={c.id}>
            <Card className="project-card-view editable-item">
              <ItemControls collection="certifications" item={c} label="certification" />
              <Card.Body>
                <Card.Title>
                  {c.url && !editMode ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="cert-link">{c.title}</a>
                  ) : (
                    <EText value={c.title} placeholder="Title" onSave={save(c.id, "title")} />
                  )}
                </Card.Title>
                <Card.Text>
                  <EText value={c.issuer} placeholder="Issuer" onSave={save(c.id, "issuer")} />
                  {c.issuer && c.date && " · "}
                  <EText value={c.date} placeholder="Date" onSave={save(c.id, "date")} />
                </Card.Text>
                {editMode && (
                  <small>
                    Verify URL: <EText value={c.url} placeholder="https://…" onSave={save(c.id, "url")} />
                  </small>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <AddButton
        collection="certifications"
        label="Add certification"
        data={{ title: "New certification", issuer: "", date: "", url: "" }}
      />
    </>
  );
}

export default Certifications;
