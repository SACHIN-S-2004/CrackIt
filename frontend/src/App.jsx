import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { DarkModeProvider } from './components/common/DarkModeToggle';
import HomePage from "./pages/HomePage";
import TestCategories from "./pages/TestCategories";
import TestDifficulty from "./pages/TestDifficulty";
import TestPage from './pages/TestPage';
import PerformanceTracker from './pages/PerformanceTracker';
import NotifyContainer from "./utils/Notify";
import './styles/App.css'
import './styles/darkMode.css' // Import dark mode styles

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <ToastContainer position="top-center" />
        <NotifyContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
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