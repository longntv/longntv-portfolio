import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";

function Github() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I <strong className="primary">Code</strong>
      </h1>
      <GitHubCalendar
        username="longntv"
        blockSize={15}
        blockMargin={5}
        theme={{
          level0: "#1b2229",
          level1: "#0b4f4d",
          level2: "#0a7572",
          level3: "#049b97",
          level4: "#2fd6d1",
        }}
        fontSize={16}
      />
    </Row>
  );
}

export default Github;
