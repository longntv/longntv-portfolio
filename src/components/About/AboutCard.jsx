import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { useStore } from "../../lib/store";
import { EMarkdown, ELines, EText } from "../Edit/Editable";

function AboutCard() {
  const { site, saveSite } = useStore();
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <div style={{ textAlign: "justify" }}>
            <EMarkdown value={site.aboutBio} onSave={(aboutBio) => saveSite({ aboutBio })} />
          </div>
          <ELines
            items={site.hobbies}
            placeholder="Hobbies, one per line"
            onSave={(hobbies) => saveSite({ hobbies })}
            render={(hobbies) => (
              <ul>
                {hobbies.map((h) => (
                  <li className="about-activity" key={h}>
                    <ImPointRight /> {h}
                  </li>
                ))}
              </ul>
            )}
          />

          <p style={{ color: "rgb(155 126 172)" }}>
            <EText value={site.quote} placeholder="Favourite quote" onSave={(quote) => saveSite({ quote })} />
          </p>
          <footer className="blockquote-footer">
            <EText value={site.quoteAuthor} placeholder="Quote author" onSave={(quoteAuthor) => saveSite({ quoteAuthor })} />
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
