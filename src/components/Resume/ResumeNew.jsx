import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.js?url";
import { useStore } from "../../lib/store";
import { EFile } from "../Edit/Editable";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const { site, saveSite } = useStore();
  const pdf = site.resume;

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const download = pdf && (
    <Row style={{ justifyContent: "center", position: "relative" }}>
      <Button
        variant="primary"
        href={pdf}
        target="_blank"
        style={{ maxWidth: "250px" }}
      >
        <AiOutlineDownload />
        &nbsp;Download CV
      </Button>
    </Row>
  );

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative", paddingBottom: "10px" }}>
          <EFile accept="application/pdf" label="Upload resume PDF" onSave={(resume) => saveSite({ resume })} />
        </Row>
        {download}

        <Row className="resume">
          {pdf ? (
            <Document file={pdf} className="d-flex justify-content-center">
              <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
            </Document>
          ) : (
            <p style={{ position: "relative" }}>Resume coming soon.</p>
          )}
        </Row>

        {download}
      </Container>
    </div>
  );
}

export default ResumeNew;
