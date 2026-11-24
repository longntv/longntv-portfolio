import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import iogate from "../../Assets/Projects/io-gate.png";
import move from "../../Assets/Projects/move.png";
import magichandsImg from "../../Assets/Projects/magichand.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="primary">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Col md={6} className="project-card">
            <ProjectCard
              title="ANDPAD – Construction Management Platform"
              descriptions={[
                {
                  "subtitle": "Measurement Service",
                  "desc": "is to manage IoT devices, thermal images with measurements such as temperature, humidity, power meters, and CO2 meters."
                },
                {
                  "subtitle": "Ouchinote Service",
                  "desc": `A CRM-like system tailored for builders to manage customer interactions, track messages, generate reports, and store photos. 
                          It streamlines communication and data organization, improving client relationship management for construction projects.`
                },
                {
                  "subtitle": "PoC - Remote Service",
                  "desc": `a remote video call service, integrating Twilio SDK to enable seamless video communication within the platform. 
                    This solution supports virtual interactions, enhancing remote collaboration and service delivery.`
                },
              ]}
              techStacks={[
                {
                  "subtitle": "Microservices Architecture",
                  "desc": "Implemented microservices using Golang and BFF (GraphQL)"
                },
                {
                  "subtitle": "Design Patterns",
                  "desc": "Applied Domain-Driven Design (DDD) architecture, monorepo (Nx), and zero-trust principles for user services."
                },
                {
                  "subtitle": "Logging & Monitoring",
                  "desc": " Integrated logging systems with Datadog, Sentry, and Zap logger for real-time monitoring and error tracking."
                },
                {
                  "subtitle": "CI/CD",
                  "desc": "Implemented CI/CD pipelines using GitHub Actions and Docker for efficient deployment."
                },
                {
                  "subtitle": "Technologies",
                  "desc": "Golang, Python, GraphQL, MySQL, Redis, Docker, Kubernetes, AWS (EKS, S3, SNS, SQS, DynamoDB), Terraform"
                },
              ]}
              productLink="https://andpad.co.jp/news/5827/"
            />
          </Col>
          
          <Col md={6} className="project-card">
            <ProjectCard
              imgPath={iogate}
              title="IO-GATE - RoSo Device Management"
              descriptions={[
                {
                  "subtitle": "Full-Stack IoT Platform Development",
                  "desc": "End-to-end development of an industrial IoT gateway—from embedded firmware to cloud backend and front-end dashboards."
                },
                {
                  "subtitle": "Embedded System",
                  "desc": "Developed device firmware using C++ for ARM-based boards, handling sensor communication, data packaging, and MQTT messaging."
                },
                {
                  "subtitle": "Backend System",
                  "desc": "Implemented scalable backend services using Golang and Node.js with TypeScript to receive, process, and store telemetry data from devices."
                },
                {
                  "subtitle": "Front-End Dashboard",
                  "desc": "Built web dashboards in Vue.js for monitoring real-time sensor data, device status, and analytics."
                },
                {
                  "subtitle": "Cloud Integration",
                  "desc": "Integrated with AWS IoT Core for device communication, Lambda for serverless processing, and S3/DynamoDB for data storage and retrieval."
                },
                {
                  "subtitle": "Infrastructure as Code",
                  "desc": "Provisioned and managed cloud infrastructure using Terraform for repeatable and version-controlled deployment."
                }
              ]}
              techStacks={[
                {
                  "subtitle": "Embedded & Protocols",
                  "desc": "C++, MQTT, ARM"
                },
                {
                  "subtitle": "Backend",
                  "desc": "Golang, TypeScript, Node.js, Adonisjs"
                },
                {
                  "subtitle": "Frontend and Mobile",
                  "desc": "Vuejs, React Native"
                },
                {
                  "subtitle": "Cloud & Infrastructure",
                  "desc": "AWS Services (IoT Core, Lambda, S3, SNS, SQS, DynamoDB), Terraform"
                }
              ]}
              productLink="https://www.roundsolutions.com/iot-gateways/io-gate"
            />
          </Col>

          <Col md={6} className="project-card">
            <ProjectCard
              imgPath={magichandsImg}  // Replace with actual image or logo
              title="Magic Hands – On-Demand Household Services App"
              productLink="https://magichands.com.vn/"
              descriptions={[
                {
                  "subtitle": "Platform Overview",
                  "desc": "An app for booking household services such as hourly maid service, deep cleaning, grocery shopping, cooking, laundry, air-conditioner cleaning, and more — all within 60 seconds."
                },
                {
                  "subtitle": "System Architecture Design",
                  "desc": "Designed the overall backend system architecture using a service-oriented approach to ensure scalability, maintainability, and future expansion."
                },
                {
                  "subtitle": "Backend Development",
                  "desc": "Led backend development in Node.js (TypeScript), covering service booking, partner management, scheduling, customer handling, and order processing."
                },
                {
                  "subtitle": "Partner & Customer Flow",
                  "desc": "Partners (housekeepers) actively accept jobs, contact customers, and confirm services directly through the app for a seamless experience."
                },
                {
                  "subtitle": "Admin Panel APIs",
                  "desc": "Developed RESTful APIs for the admin panel to manage partners, services, bookings, customers, and transactions."
                },
                {
                  "subtitle": "Infrastructure & Deployment",
                  "desc": "Deployed on AWS using EC2, RDS, and S3; provisioned infrastructure with Terraform for consistency and automation."
                }
              ]}
              techStacks={[
                {
                  "subtitle": "Backend",
                  "desc": "Node.js, TypeScript"
                },
                {
                  "subtitle": "Database",
                  "desc": "MySQL, Redis, DynamoDB"
                },
                {
                  "subtitle": "DevOps & Cloud",
                  "desc": "AWS (EC2, RDS, S3), Terraform"
                },
                {
                  "subtitle": "Architecture Style",
                  "desc": "Service-Oriented Architecture (SOA)"
                },
                {
                  "subtitle": "Third-Party Services",
                  "desc": "Payment Gateway Integration, SMS & Email APIs"
                }
              ]}
            />
          </Col>

          <Col md={6} className="project-card">
            <ProjectCard
              imgPath={move}
              title="MOVE (Formerly LIV3LY) – Social Fitness Super App"
              productLink="https://www.liv3ly.com/"
              descriptions={[
                {
                  "subtitle": "Contributed to the development of MOVE",
                  "desc": "a fast-growing social fitness platform that connects active lifestyle users with global brands through engaging virtual runs and fitness experiences across Asia Pacific."
                },
              ]}
              techStacks={[
                {
                  "subtitle": "Microservice Architecture",
                  "desc": "Led the design and implementation of a new microservice system using Golang, RabbitMQ, and API gateway with the Phoenix framework."
                },
                {
                  "subtitle": "AWS Services",
                  "desc": "Worked with AWS services such as Load Balancer, SQS, SNS, Lambda, and DynamoDB for building scalable and efficient solutions."
                },
                {
                  "subtitle": "CI/CD & Deployment",
                  "desc": "GitLab CI, Docker"
                },
                {
                  "subtitle": "AWS Services",
                  "desc": "AWS Load Balancer, SQS, SNS, Lambda, DynamoDB"
                },
              ]}
            />
          </Col>

          <Col md={6} className="project-card">
            <ProjectCard
              title="BIMA Project – Bosch"
              descriptions={[
                {
                  subtitle: "Smart Grid Monitoring System",
                  desc: "Developed an IoT-based system to collect data from inverters and power meters, and send data to AWS Cloud for real-time grid monitoring.",
                },
              ]}
              techStacks={[
                {
                  subtitle: "Firmware Development",
                  desc: "Implemented firmware for STM32F2 to communicate with Flin-Inverter (RS232), Outback Inverter (SunSpec), Power Meter (ModbusRTU), 3G module (SARA-U201), LCD, and SD-Card.",
                },
                {
                  subtitle: "Cloud Integration",
                  desc: "Used AWS IoT SDK to publish and subscribe sensor data to AWS cloud infrastructure.",
                },
                {
                  subtitle: "Testing & Collaboration",
                  desc: "Designed test plans and cases, executed and reviewed results, and supported teammates in technical resolution and task management.",
                },
                {
                  subtitle: "Technologies",
                  desc: "STM32F2, C++, RS232, ModbusRTU, SunSpec, AWS IoT Core, SARA-U201",
                },
              ]}
            />
          </Col>

          <Col md={6} className="project-card">
            <ProjectCard
              title="Innovation Projects"
              descriptions={[
                {
                  subtitle: "Smart Farming",
                  desc: "IoT-Based Weight Management Solution for beef cattle – rofarm.tk",
                },
                {
                  subtitle: "CRM System",
                  desc: "CRM Solution for beauty & clinic with 11+ features – beauticrm.com (web + mobile).",
                },
                {
                  subtitle: "Retail & Order Systems",
                  desc: "Purchase Order System (Air Conditioner Shop), aleMilk.com (fresh milk delivery), VuNguyenJSC (Quotation & Order Management).",
                },
                {
                  subtitle: "Digital Marketing",
                  desc: "Dynamic Search Ads Generator for Shopify & WordPress.",
                },
                {
                  subtitle: "HRM Platform with AI",
                  desc: "Face-authenticated HRM system using NVIDIA Xavier – includes resource management, leave booking, and performance review.",
                },
              ]}
              techStacks={[
                {
                  subtitle: "Technologies Used",
                  desc: "Golang, Node.js, Typescript, C++, Vue.js, Python, AWS (IoT Core, Lambda, S3, DynamoDB), Terraform, GitLab CI, NVIDIA Xavier",
                },
              ]}
            />
          </Col>


        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
