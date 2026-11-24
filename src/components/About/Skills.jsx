import React from "react";
import { Col, Row } from "react-bootstrap";
import { useStore } from "../../lib/store";
import { AddButton, EText, ItemControls } from "../Edit/Editable";
import { skillIcon } from "./skillIcons";

function Skills() {
  const { content, editMode, updateItem } = useStore();
  return (
    <>
      {content.skills.map((group) => (
        <div key={group.id} className="skill-group editable-item">
          <ItemControls collection="skills" item={group} label="skill group" />
          <EText
            as="h3"
            className="skill-group-title purple"
            value={group.group}
            placeholder="Group name"
            onSave={(v) => updateItem("skills", group.id, { group: v })}
          />
          {editMode ? (
            <EText
              as="p"
              value={(group.items || []).join(", ")}
              placeholder="Skills, comma separated"
              onSave={(v) => updateItem("skills", group.id, { items: v.split(",").map((s) => s.trim()).filter(Boolean) })}
            />
          ) : (
            <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
              {(group.items || []).map((name) => {
                const Icon = skillIcon(name);
                return (
                  <Col xs={4} md={2} className="tech-icons" key={name} title={name}>
                    {Icon && <Icon />}
                    <div className="tech-icon-label">{name}</div>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      ))}
      <AddButton collection="skills" label="Add skill group" data={{ group: "New group", items: [] }} />
    </>
  );
}

export default Skills;
