import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const StoreContext = createContext(null);

// Remember the admin's edit-mode toggle across reloads (per browser, best effort).
const readEditMode = () => {
  try {
    return localStorage.getItem("editMode") === "1";
  } catch {
    return false;
  }
};
const writeEditMode = (on) => {
  try {
    localStorage.setItem("editMode", on ? "1" : "0");
  } catch {}
};

async function request(method, url, body) {
  const isForm = body instanceof FormData;
  const res = await fetch(url, {
    method,
    credentials: "same-origin",
    headers: body && !isForm ? { "content-type": "application/json" } : undefined,
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export function StoreProvider({ children }) {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [editMode, setEditModeState] = useState(readEditMode);
  const setEditMode = useCallback((on) => {
    writeEditMode(on);
    setEditModeState(on);
  }, []);
  const [status, setStatus] = useState(null); // { type: "ok" | "error" | "busy", text }

  useEffect(() => {
    request("GET", "/api/content").then(setContent, (e) => setError(e.message));
    request("GET", "/api/me").then((me) => setAdmin(me.admin), () => {});
  }, []);

  // Wraps a mutation: shows busy/saved/error state in the admin bar.
  const run = useCallback(async (fn) => {
    setStatus({ type: "busy", text: "Saving…" });
    try {
      const result = await fn();
      setStatus({ type: "ok", text: "Saved" });
      return result;
    } catch (e) {
      setStatus({ type: "error", text: e.message });
      throw e;
    }
  }, []);

  const setCollection = (collection, update) =>
    setContent((c) => ({ ...c, [collection]: update(c[collection]) }));

  const actions = {
    saveSite: (patch) =>
      run(async () => {
        const site = await request("PATCH", "/api/site", patch);
        setContent((c) => ({ ...c, site }));
      }),
    createItem: (collection, data) =>
      run(async () => {
        const item = await request("POST", `/api/items/${collection}`, data);
        setCollection(collection, (list) => [...list, item]);
        return item;
      }),
    updateItem: (collection, id, patch) =>
      run(async () => {
        const item = await request("PATCH", `/api/items/${collection}/${id}`, patch);
        setCollection(collection, (list) => list.map((x) => (x.id === id ? item : x)));
        return item;
      }),
    deleteItem: (collection, id) =>
      run(async () => {
        await request("DELETE", `/api/items/${collection}/${id}`);
        setCollection(collection, (list) => list.filter((x) => x.id !== id));
      }),
    moveItem: (collection, id, delta) =>
      run(async () => {
        const ids = content[collection].map((x) => x.id);
        const i = ids.indexOf(id);
        const j = i + delta;
        if (i < 0 || j < 0 || j >= ids.length) return;
        [ids[i], ids[j]] = [ids[j], ids[i]];
        const list = await request("POST", `/api/items/${collection}/reorder`, { ids });
        setCollection(collection, () => list);
      }),
    upload: (file) =>
      run(async () => {
        const fd = new FormData();
        fd.append("file", file);
        const { url } = await request("POST", "/api/upload", fd);
        return url;
      }),
    login: async (password) => {
      await request("POST", "/api/login", { password });
      setAdmin(true);
      setEditMode(true);
    },
    logout: async () => {
      await request("POST", "/api/logout");
      setAdmin(false);
      setEditMode(false);
    },
  };

  const value = {
    content,
    site: content?.site || {},
    error,
    admin,
    editMode: admin && editMode,
    setEditMode,
    status,
    ...actions,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
