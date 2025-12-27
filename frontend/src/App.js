import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import RoleSelection from './components/RoleSelection';
import SMEHomepageNew from './components/SMEHomepageNew';
import ProjectProfileNew from './components/ProjectProfileNew';
import CreateProjectStep1 from './components/CreateProjectStep1';
import CreateProjectStep2 from './components/CreateProjectStep2';
import CreateProjectStep3 from './components/CreateProjectStep3';
import CreateProjectStep4 from './components/CreateProjectStep4';
import RecommendationList from './components/RecommendationList';
import AgencyProfile from './components/AgencyProfile';
import ChatView from './components/ChatView';
import MatchConfirmation from './components/MatchConfirmation';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<RoleSelection />} />
            <Route path="/sme-home" element={<SMEHomepageNew />} />
            <Route path="/projects" element={<ProjectProfileNew />} />
            <Route path="/create-project/step1" element={<CreateProjectStep1 />} />
            <Route path="/create-project/step2" element={<CreateProjectStep2 />} />
            <Route path="/create-project/step3" element={<CreateProjectStep3 />} />
            <Route path="/create-project/step4" element={<CreateProjectStep4 />} />
            <Route path="/recommend/:projectId" element={<RecommendationList />} />
            <Route path="/agency/:agencyId" element={<AgencyProfile />} />
            <Route path="/chat/:requestId" element={<ChatView />} />
            <Route path="/match-confirmed/:requestId" element={<MatchConfirmation />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
