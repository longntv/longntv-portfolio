import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { useStore } from "../../lib/store";
import { EText, ELines, EImage } from "../Edit/Editable";

function Home() {
  const { site, saveSite } = useStore();
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                <EText value={site.greeting} onSave={(v) => saveSite({ greeting: v })} />{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name">
                  {" "}
                  <EText value={site.name} style={{ textTransform: "uppercase" }} onSave={(v) => saveSite({ name: v })} />
                </strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <ELines
                  items={site.roles}
                  placeholder="Roles for the typing effect, one per line"
                  onSave={(roles) => saveSite({ roles })}
                  render={(roles) => <Type strings={roles} />}
                />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <EImage
                src={site.heroImage}
                fallback={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
                onSave={(heroImage) => saveSite({ heroImage })}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
