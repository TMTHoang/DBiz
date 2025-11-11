import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProjectProfile from './components/ProjectProfile';
import RecommendationList from './components/RecommendationList';
import AgencyProfile from './components/AgencyProfile';
import ChatView from './components/ChatView';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Agrinet</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ProjectProfile />} />
            <Route path="/recommend/:projectId" element={<RecommendationList />} />
            <Route path="/agency/:agencyId" element={<AgencyProfile />} />
            <Route path="/chat/:requestId" element={<ChatView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
