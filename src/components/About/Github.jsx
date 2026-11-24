import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";
import { useStore } from "../../lib/store";
import { EText } from "../Edit/Editable";

function Github() {
  const { site, editMode, saveSite } = useStore();
  if (!site.githubUser && !editMode) return null;
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I <strong className="purple">Code</strong>
      </h1>
      {editMode && (
        <p>
          GitHub username:{" "}
          <EText value={site.githubUser} placeholder="username" onSave={(githubUser) => saveSite({ githubUser })} />
        </p>
      )}
      {site.githubUser && (
        <GitHubCalendar
          username={site.githubUser}
          blockSize={15}
          blockMargin={5}
          color="#c084f5"
          fontSize={16}
        />
      )}
    </Row>
  );
}

export default Github;
