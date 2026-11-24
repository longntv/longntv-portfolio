import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      {/* {props.imgPath? (
          <Card.Img variant="top" src={props.imgPath} alt="card-img"  
            style={{ maxHeight: "300px", objectFit: "contain" }}/>
        ): null
      } */}
      <Card.Body>
        <Card.Title>
        {props.productLink ? (
          <a href={props.productLink} target="_blank" rel="noopener noreferrer" className="project-card-title">
            {props.title}
          </a>
        ) : (
          props.title
        )}
        </Card.Title>
        <br />
        <Card.Text style={{ textAlign: "left" }}>
          {props.descriptions && (
            <p>
              {props.descriptions.map((desc, index) => (
                <p>
                  <span className="primary"> {desc.subtitle} </span>
                  {desc.desc}
                </p>
              ))}
            </p>
          )}
        </Card.Text>

        {/* Render Tech Stack if provided */}
        <br />
        {props.techStacks && (
          <p >
            <strong>Developed Key Features:</strong>
            <br />
            <br />
            {props.techStacks.map((desc, index) => (
              <p style={{ textAlign: "left" }}>
                <span className="primary"> {desc.subtitle} </span>
                {desc.desc}
              </p>
            ))}
          </p>
        )}
      </Card.Body>

      <Card.Footer>
        {props.ghLink && (
          <Button variant="primary" href={props.ghLink} target="_blank">
            <BsGithub /> &nbsp; GitHub
          </Button>
        )}
        {props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp; Product
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}

export default ProjectCards;