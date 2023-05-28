import Game from "./pages/Game";
import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Tutorial from "./pages/Tutorial";

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route exact path='/' element={<Game />} />
                <Route path='/tutorial' element={<Tutorial />} />
            </Routes>
        </Router>
    );
}
 
export default App;