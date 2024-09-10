
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlayerVsPlayerComponent from './views/playervsplayer/PlayerVsPlayerComponent'
import LandingPage from './views/LandingPage';
import RegisterComponent from './views/registercomponent/RegisterComponent';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/player-vs-player' element={<PlayerVsPlayerComponent />} />
        <Route path='/register' element={<RegisterComponent />} />
        {/* <Route path="/computer-vs-player" element={<ComputerVsPlayer />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
