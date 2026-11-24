import React from "react";
import Button from "react-bootstrap/Button";
import { useStore } from "../../lib/store";

function AdminBar() {
  const { admin, editMode, setEditMode, status, logout } = useStore();
  if (!admin) return null;
  return (
    <div className="admin-bar">
      <label className="admin-bar-toggle">
        <input type="checkbox" checked={editMode} onChange={(e) => setEditMode(e.target.checked)} /> Edit mode
      </label>
      {status && <span className={`admin-bar-status ${status.type}`}>{status.text}</span>}
      <Button size="sm" variant="secondary" onClick={logout}>Logout</Button>
    </div>
  );
}

export default AdminBar;
