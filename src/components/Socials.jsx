import React from "react";
import { AiFillGithub, AiOutlineTwitter, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { useStore } from "../lib/store";
import { EText } from "./Edit/Editable";

export const SOCIALS = [
  { key: "github", label: "GitHub", icon: AiFillGithub },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedinIn },
  { key: "twitter", label: "Twitter / X", icon: AiOutlineTwitter },
  { key: "facebook", label: "Facebook", icon: FaFacebookF },
  { key: "email", label: "Email", icon: AiOutlineMail },
];

const href = (key, value) => (key === "email" && !value.startsWith("mailto:") ? `mailto:${value}` : value);

/** Social icon links; in edit mode (when `editable`) shows a URL field per network. */
function Socials({ listClassName, linkClassName, linkStyle, editable = false }) {
  const { site, editMode, saveSite } = useStore();
  const socials = site.socials || {};

  if (editable && editMode) {
    return (
      <div className="socials-editor">
        {SOCIALS.map(({ key, label, icon: Icon }) => (
          <div key={key}>
            <Icon /> {label}:{" "}
            <EText
              value={socials[key]}
              placeholder={key === "email" ? "you@example.com" : "https://…"}
              onSave={(v) => saveSite({ socials: { ...socials, [key]: v } })}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className={listClassName}>
      {SOCIALS.filter(({ key }) => socials[key]).map(({ key, label, icon: Icon }) => (
        <li className="social-icons" key={key}>
          <a
            href={href(key, socials[key])}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            style={linkStyle}
            aria-label={label}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Socials;
