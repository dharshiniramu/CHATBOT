import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './components/homepage.js'; 
import JobApplication from './components/Jobapplication.js';
import InternApplication from './components/internapplication.js';
import FEACFDSimulation from './components/FEACFDSimulation.js';
import AboutUs from './components/AboutUs.js';
import Contact from './components/Contact.js';
import ImageAnnotation from './components/ImageAnnotation.js';
import VideoAnnotation from './components/videoannotation.js';
import TextAnnotation from './components/textannotation.js';
import Client from './components/client.js';
import CADCAEAutomation from './components/CADCAEAutomation.js';
import CyberSecurity from './components/CyberSecurity.js';
import DataAnalytics from './components/DataAnalytics.js';
import NLP from './components/NLP.js';
import BigDataAnalysis from './components/BigDataAnalysis.js';
import PaaS from './components/PaaS.js';
import SaaS from './components/SaaS.js';
import CloudStorage from './components/CloudStorage.js';
import StructuralSubstantiation from './components/StructuralSubstantiation.js';
import FatigueAnalysis from './components/FatigueAnalysis.js';
import DamageAnalysis from './components/DamageAnalysis.js';

function App() {
  return (
    <Router>
      <div className="App">
         <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/jobapplication" element={<JobApplication />} />
          <Route path="/internapplication" element={<InternApplication />} />
          <Route path="/feacfdsimulation" element={<FEACFDSimulation />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/image-annotation" element={<ImageAnnotation />} />
          <Route path="/services/video-annotation" element={<VideoAnnotation />} />
          <Route path="/services/text-annotation" element={<TextAnnotation />} />
          <Route path="/services/cadcae-automation" element={<CADCAEAutomation />} />
          <Route path="/services/cyber-security" element={<CyberSecurity />} />
          <Route path="/client" element={<Client />} />
          
          {/* AIML Service Routes */}
          <Route path="/services/data-analytics" element={<DataAnalytics />} />
          <Route path="/services/nlp" element={<NLP />} />
          <Route path="/services/big-data-analysis" element={<BigDataAnalysis />} />
          
          {/* Cloud Service Routes */}
          <Route path="/services/paas" element={<PaaS />} />
          <Route path="/services/saas" element={<SaaS />} />
          <Route path="/services/cloud-storage" element={<CloudStorage />} />

          {/* Structured Engineering Routes */}
          <Route path="/services/structural-substantiation" element={<StructuralSubstantiation />} />
          <Route path="/services/fatigue-analysis" element={<FatigueAnalysis />} />
          <Route path="/services/damage-analysis" element={<DamageAnalysis />} />
         </Routes>
      </div>
    </Router>
  );
}

export default App;
