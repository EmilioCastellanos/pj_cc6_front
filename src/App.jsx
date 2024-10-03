import './App.css';
import About from './pages/about';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/pjnavbar';
import TrackingPage from './pages/tracking';
import Solicitar from './pages/solicitarEnvio';
import Disponibilidad from './pages/disponibilidad';
import UpdateStatus from './pages/updateStatus';


function App() {
  return (
    <div>
      <MyNavbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/solicitar-envio" element={<Solicitar />} />
          <Route path="/disponibilidad" element={<Disponibilidad />} />
          <Route path="/updateStatus" element={<UpdateStatus />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;