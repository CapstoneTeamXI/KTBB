import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";

export default function AppRouter() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/game">Enter Game</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
