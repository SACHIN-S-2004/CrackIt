import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { DarkModeProvider } from './components/DarkMode';
import Index from "./pages/home/index";
import TestCategories from "./components/TestCategories";
import TestDifficulty from "./components/TestDifficulty";
import TestPage from './components/TestPage';
import PerformanceTracker from './components/PerformanceTracker';
import './App.css'
import './darkMode.css' // Import dark mode styles

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/aptitude-tests" element={<TestCategories />}/>
          <Route path="/performance-tracker" element={<PerformanceTracker />} />
          <Route path="/aptitude-tests/:category/:topic/" element={<TestDifficulty />}/>
          <Route path="/aptitude-tests/:category/:topic/:difficulty/test" element={<TestPage />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  )
}

export default App