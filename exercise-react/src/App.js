import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage'; 
import CreateExercisePage from './pages/CreateExercisePage'; 
import { useState } from 'react';
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState(); 

  return (
      <div className="App">
          <Router>
              <header className="App-header">
                <h1>Exercise Tracker</h1>
                <p>Keep track of your personal exercises. You can ceate and edit your exercises. Stay hydrated!!</p>
                  <Navigation />
                  <Routes>
                      <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
                      <Route path="/Create" element={<CreateExercisePage />} />
                      <Route path="/Edit" element={<EditExercisePage exerciseToEdit={exerciseToEdit} setExerciseToEdit={setExerciseToEdit} />} />
                  </Routes>
                  <footer>
                    <p>&#169; {new Date().getFullYear()} Gemini Kaushik</p>
                     </footer>
              </header>
          </Router>
      </div>
  );
}

export default App;