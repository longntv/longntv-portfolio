import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Socials from "./Socials";
import { EText } from "./Edit/Editable";
import { useStore } from "../lib/store";

function Footer() {
  const { site, saveSite } = useStore();
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <EText as="h3" value={site.footerText} onSave={(v) => saveSite({ footerText: v })} />
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} {site.name}</h3>
        </Col>
        <Col md="4" className="footer-body">
          <Socials listClassName="footer-icons" linkStyle={{ color: "white" }} />
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
