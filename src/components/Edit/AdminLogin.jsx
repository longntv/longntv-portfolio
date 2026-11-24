import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
import Particle from "../Particle";
import { useStore } from "../../lib/store";

function AdminLogin() {
  const { admin, login } = useStore();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  if (admin) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(password);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container className="admin-login">
        <h1 className="project-heading">
          Admin <strong className="purple">Login</strong>
        </h1>
        <Form onSubmit={submit}>
          <Form.Control
            type="password"
            autoFocus
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="admin-login-error">{error}</p>}
          <Button type="submit" variant="primary" disabled={busy || !password}>
            Login
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default AdminLogin;
