import React from "react";
import { Container } from "react-bootstrap";
import { MdSecurity } from "react-icons/md";
import { FaFileAlt, FaRobot, FaBug, FaUserCheck } from "react-icons/fa";

const steps = [
  { icon: FaFileAlt, title: "Spec", text: "PRP specs define what to build and how it is verified." },
  { icon: FaRobot, title: "Build", text: "Claude Code implements, with custom skills as guardrails for design patterns, review and test." },
  { icon: MdSecurity, title: "Security review", text: "Security checks run in every code review." },
  { icon: FaBug, title: "Pentest", text: "AI-written code is pentested before release." },
  { icon: FaUserCheck, title: "Human approval", text: "An engineer approves every gate. The AI never ships on its own." },
];

const stats = [
  { value: "15", label: "years in software" },
  { value: "Millions", label: "of sensor readings ingested" },
  { value: "13+", label: "device types monitored in real time" },
  { value: "~3×", label: "smaller telemetry rows after redesign" },
];

function AdlcPipeline() {
  return (
    <Container fluid className="adlc-section">
      <Container>
        <h1 className="project-heading">
          How I ship with AI, <strong className="primary">safely</strong>
        </h1>
        <p className="adlc-lead">
          The secure AI-driven development lifecycle (ADLC) I am rolling out with my team:
        </p>
        <div className="adlc-steps">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <React.Fragment key={title}>
              {i > 0 && <div className="adlc-arrow" aria-hidden="true">→</div>}
              <div className="adlc-step">
                <div className="adlc-step-num">{i + 1}</div>
                <Icon className="adlc-step-icon" />
                <h5>{title}</h5>
                <p>{text}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
        <p className="adlc-tagline">
          AI writes the code. <span className="primary">Engineers own the decisions.</span>
        </p>

        <div className="adlc-stats">
          {stats.map(({ value, label }) => (
            <div className="adlc-stat" key={label}>
              <div className="adlc-stat-value primary">{value}</div>
              <div className="adlc-stat-label">{label}</div>
            </div>
          ))}
        </div>

      </Container>
    </Container>
  );
}

export default AdlcPipeline;
