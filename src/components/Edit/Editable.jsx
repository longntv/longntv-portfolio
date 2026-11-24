import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import ReactMarkdown from "react-markdown";
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useStore } from "../../lib/store";

export function Markdown({ children, className }) {
  return (
    <ReactMarkdown className={`markdown ${className || ""}`} linkTarget="_blank">
      {children || ""}
    </ReactMarkdown>
  );
}

// Inserts plain text at the caret of a contentEditable element.
function pastePlainText(e, singleLine) {
  e.preventDefault();
  let text = e.clipboardData.getData("text/plain");
  if (singleLine) text = text.replace(/\s*\n\s*/g, " ");
  document.execCommand("insertText", false, text);
}

/**
 * Short plain-text field edited in place. Paste always drops formatting.
 * Enter (single line) or blur saves, Escape cancels.
 */
export function EText({ value, onSave, as: Tag = "span", className = "", placeholder = "Click to edit", multiline = false, style }) {
  const { editMode } = useStore();
  if (!editMode) return value ? <Tag className={className} style={style}>{value}</Tag> : null;
  return (
    <Tag
      key={value || ""}
      className={`${className} editable`}
      style={style}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onPaste={(e) => pastePlainText(e, !multiline)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !multiline) {
          e.preventDefault();
          e.currentTarget.blur();
        }
        if (e.key === "Escape") {
          e.currentTarget.textContent = value || "";
          e.currentTarget.blur();
        }
      }}
      onBlur={(e) => {
        const next = e.currentTarget.innerText.trim();
        if (next !== (value || "")) onSave(next).catch(() => (e.target.textContent = value || ""));
      }}
    >
      {value}
    </Tag>
  );
}

/** Comma-separated tags, shown as pills. */
export function ETags({ tags = [], onSave }) {
  const { editMode } = useStore();
  if (editMode) {
    return (
      <div className="tag-list">
        <EText
          value={tags.join(", ")}
          placeholder="Tags, comma separated"
          onSave={(v) => onSave(v.split(",").map((t) => t.trim()).filter(Boolean))}
        />
      </div>
    );
  }
  if (!tags.length) return null;
  return (
    <div className="tag-list">
      {tags.map((t) => (
        <span key={t} className="tag-pill">{t}</span>
      ))}
    </div>
  );
}

/** List of strings edited as one item per line. */
export function ELines({ items = [], onSave, render, placeholder = "One item per line" }) {
  const { editMode } = useStore();
  if (!editMode) return render(items);
  return (
    <EText
      as="div"
      multiline
      className="editable-lines"
      value={items.join("\n")}
      placeholder={placeholder}
      onSave={(v) => onSave(v.split("\n").map((s) => s.trim()).filter(Boolean))}
    />
  );
}

/** Long text in Markdown: rendered for visitors, textarea + live preview in edit mode. */
export function EMarkdown({ value, onSave, placeholder = "Click to write (Markdown supported)", className }) {
  const { editMode, upload } = useStore();
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const textarea = useRef(null);

  if (!editMode) return <Markdown className={className}>{value}</Markdown>;

  if (draft === null) {
    return (
      <div className="editable-block" title="Click to edit" onClick={() => setDraft(value || "")}>
        {value ? <Markdown className={className}>{value}</Markdown> : <em className="placeholder-text">{placeholder}</em>}
      </div>
    );
  }

  // Pasting an image uploads it and inserts a Markdown image at the caret.
  const onPaste = async (e) => {
    const file = [...e.clipboardData.files].find((f) => f.type.startsWith("image/"));
    if (!file) return;
    e.preventDefault();
    const el = textarea.current;
    const { selectionStart: start, selectionEnd: end } = el;
    const url = await upload(file);
    setDraft((d) => `${d.slice(0, start)}![image](${url})${d.slice(end)}`);
  };

  const save = async () => {
    setSaving(true);
    try {
      await onSave(draft);
      setDraft(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="md-editor">
      <div className="md-editor-panes">
        <textarea
          ref={textarea}
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onPaste={onPaste}
          onKeyDown={(e) => {
            if (e.key === "Escape") setDraft(null);
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) save();
          }}
          placeholder={placeholder}
        />
        <div className="md-preview">
          <Markdown className={className}>{draft}</Markdown>
        </div>
      </div>
      <div className="md-editor-actions">
        <small>Markdown · paste images directly · Ctrl+Enter to save · Esc to cancel</small>
        <Button size="sm" variant="secondary" onClick={() => setDraft(null)} disabled={saving}>Cancel</Button>
        <Button size="sm" variant="primary" onClick={save} disabled={saving}>Save</Button>
      </div>
    </div>
  );
}

function pickFile(accept, onFile) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = accept;
  input.onchange = () => input.files[0] && onFile(input.files[0]);
  input.click();
}

/** Image that can be replaced by clicking, dropping or pasting a file in edit mode. */
export function EImage({ src, fallback, onSave, alt = "", className, style, children }) {
  const { editMode, upload } = useStore();
  const shown = src || fallback;
  const img = shown ? <img src={shown} alt={alt} className={className} style={style} /> : null;
  if (!editMode) return children ? children(img) : img;

  const replace = async (file) => {
    if (file && file.type.startsWith("image/")) await onSave(await upload(file));
  };
  return (
    <div
      className="editable-image"
      tabIndex={0}
      onPaste={(e) => {
        const file = [...e.clipboardData.files][0];
        if (file) {
          e.preventDefault();
          replace(file);
        }
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        replace(e.dataTransfer.files[0]);
      }}
    >
      {img || <div className="image-placeholder">No image</div>}
      <div className="editable-image-actions">
        <Button size="sm" onClick={() => pickFile("image/*", replace)}>Change image</Button>
        {src && <Button size="sm" variant="secondary" onClick={() => onSave("")}>Remove</Button>}
        <small>or click here and paste / drop an image</small>
      </div>
    </div>
  );
}

/** Upload button for non-image files (e.g. resume PDF). */
export function EFile({ accept, label, onSave }) {
  const { editMode, upload } = useStore();
  if (!editMode) return null;
  return (
    <Button variant="primary" onClick={() => pickFile(accept, async (f) => onSave(await upload(f)))}>
      {label}
    </Button>
  );
}

/** Move up / move down / delete controls for an item of a collection. */
export function ItemControls({ collection, item, label = "item" }) {
  const { editMode, moveItem, deleteItem } = useStore();
  if (!editMode) return null;
  return (
    <div className="item-controls">
      <button type="button" title="Move up" onClick={() => moveItem(collection, item.id, -1)}><AiOutlineArrowUp /></button>
      <button type="button" title="Move down" onClick={() => moveItem(collection, item.id, 1)}><AiOutlineArrowDown /></button>
      <button
        type="button"
        title={`Delete ${label}`}
        onClick={() => window.confirm(`Delete this ${label}?`) && deleteItem(collection, item.id)}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export function AddButton({ collection, data, label }) {
  const { editMode, createItem } = useStore();
  if (!editMode) return null;
  return (
    <div className="add-item">
      <Button variant="primary" onClick={() => createItem(collection, data)}>
        <AiOutlinePlus /> {label}
      </Button>
    </div>
  );
}
