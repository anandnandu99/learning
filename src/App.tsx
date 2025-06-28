import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Dashboard from '@/pages/Dashboard';
import Skills from '@/pages/Skills';
import LearningPaths from '@/pages/LearningPaths';
import Courses from '@/pages/Courses';
import ContinueLearning from '@/pages/ContinueLearning';
import ExploreCourses from '@/pages/ExploreCourses';
import SkillAssessment from '@/pages/SkillAssessment';
import SearchResults from '@/pages/SearchResults';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/continue-learning" element={<ContinueLearning />} />
            <Route path="/explore-courses" element={<ExploreCourses />} />
            <Route path="/skill-assessment" element={<SkillAssessment />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;