import Game from "./pages/Game";
import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Tutorial from "./pages/Tutorial";
import Statistics from "./pages/Statistics";
import { useState } from "react";



function App() {

    const [name, setName] = useState(null);

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route exact path='/' element={<Game />} />
                <Route path='/tutorial' element={<Tutorial />} />
                <Route path='/statistics' element={<Statistics />} />
            </Routes>
        </Router>
    );
}
 
export default App;