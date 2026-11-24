import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import ProjectDetail from "./components/Projects/ProjectDetail";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import AdminLogin from "./components/Edit/AdminLogin";
import AdminBar from "./components/Edit/AdminBar";
import { StoreProvider, useStore } from "./lib/store";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Site() {
  const { content, error, site } = useStore();
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (site.siteTitle) document.title = site.siteTitle;
  }, [site.siteTitle]);

  if (error) return <p className="load-error">Could not load content: {error}</p>;

  return (
    <Router>
      <Preloader load={load || !content} />
      {content && (
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
          <Footer />
          <AdminBar />
        </div>
      )}
    </Router>
  );
}

function App() {
  return (
    <StoreProvider>
      <Site />
    </StoreProvider>
  );
}

export default App;
