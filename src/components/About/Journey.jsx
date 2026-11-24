import React from "react";
import { useStore } from "../../lib/store";
import { AddButton, EMarkdown, EText, ETags, ItemControls } from "../Edit/Editable";

function Journey() {
  const { content, editMode, updateItem } = useStore();
  if (!content.experiences.length && !editMode) return null;
  const save = (id, field) => (v) => updateItem("experiences", id, { [field]: v });
  return (
    <>
      <h1 className="project-heading">
        Professional <strong className="purple">Journey</strong>
      </h1>
      <div className="resume journey">
        {content.experiences.map((x) => (
          <div className="resume-item editable-item" key={x.id}>
            <ItemControls collection="experiences" item={x} label="experience" />
            <div className="resume-title">
              <EText value={x.period} placeholder="Period" onSave={save(x.id, "period")} />
            </div>
            <h4 className="journey-role">
              <EText value={x.role} placeholder="Role" onSave={save(x.id, "role")} />
              {(x.company || editMode) && <span className="purple"> @ </span>}
              <EText className="purple" value={x.company} placeholder="Company" onSave={save(x.id, "company")} />
            </h4>
            <EMarkdown value={x.description} onSave={save(x.id, "description")} />
            <ETags tags={x.tags} onSave={save(x.id, "tags")} />
          </div>
        ))}
      </div>
      <AddButton
        collection="experiences"
        label="Add experience"
        data={{ period: "", company: "", role: "New role", description: "", tags: [] }}
      />
    </>
  );
}

export default Journey;
