// Initial content, inserted only when the database is empty.
// Everything here is a placeholder meant to be edited from the website.

export const seedSite = {
  siteTitle: "Long Nguyen | Portfolio",
  brand: "Ln.",
  name: "Long Nguyen",
  greeting: "Hi There!",
  roles: ["Software Engineer", "Backend Developer", "Problem Solver"],
  heroImage: "",
  intro:
    "I build software products end to end, from **backend services** to **web frontends**.\n\n" +
    "This text is a placeholder: log in at `/admin`, turn on *Edit mode* and paste your own introduction here (Markdown supported).",
  avatar: "",
  aboutBio:
    "Hi everyone, I am **Long Nguyen**.\n\n" +
    "Replace this paragraph with your story: where you work, what you build and what you care about.",
  hobbies: ["Building side projects", "Reading", "Travelling"],
  quote: "Strive to build things that make a difference!",
  quoteAuthor: "Long",
  githubUser: "",
  socials: { github: "", linkedin: "", twitter: "", facebook: "", email: "" },
  resume: "",
  footerText: "Designed and Developed by Long Nguyen",
};

export const seedItems = {
  projects: [
    {
      title: "Sample Project",
      category: "work",
      summary: "Short description shown on the project card. Edit it in place.",
      role: "Backend Engineer",
      period: "2025 - Present",
      tags: ["Node.js", "React", "SQLite"],
      cover: "",
      github: "",
      demo: "",
      body:
        "## Overview\n\nWrite the full story of the project here: the problem, your role, the architecture and the results.\n\n" +
        "## Highlights\n\n- Paste Markdown from your notes or README\n- Paste images straight from the clipboard\n",
    },
    {
      title: "Side Project",
      category: "side",
      summary: "A personal or community project.",
      role: "Author",
      period: "2024",
      tags: ["TypeScript"],
      cover: "",
      github: "",
      demo: "",
      body: "Describe the side project here.",
    },
  ],
  experiences: [
    {
      period: "2023 - Present",
      company: "Company Name",
      role: "Software Engineer",
      description: "What you did and what you achieved there.",
      tags: ["Go", "Kubernetes"],
    },
  ],
  skills: [
    { group: "Languages", items: ["JavaScript", "TypeScript", "Go", "Python"] },
    { group: "Frameworks", items: ["React", "Node.js", "Next.js"] },
    { group: "Data & Infra", items: ["PostgreSQL", "Redis", "Docker", "Git"] },
  ],
  certifications: [
    { title: "Certification name", issuer: "Issuer", date: "2025", url: "" },
  ],
};
