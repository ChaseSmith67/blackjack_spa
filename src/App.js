import Game from "./pages/Game";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Tutorial from "./pages/Tutorial";
import About from "./pages/About";
import { useState, useEffect } from "react";

function App() {
  // Used to set and change the theme
  const [theme, setTheme] = useState("light");

  // Toggle function passed to child for theme changes
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Rerender on theme change
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <NavBar toggle={toggleTheme} />
      <Routes>
        <Route exact path="/" element={<Game />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
