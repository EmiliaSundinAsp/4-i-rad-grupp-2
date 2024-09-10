
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './views/LandingPage';
import PlayerVsPlayerComponent from './views/PlayerVsPlayerComponent'
import Board from './classes/Board';
import Game from './classes/Game';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/player-vs-player' element={<PlayerVsPlayerComponent />} />
        <Route path='/game' element={<Game />} />
        {/* <Route path="/computer-vs-player" element={<ComputerVsPlayer />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
