
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlayerVsPlayerComponent from './views/playervsplayer/PlayerVsPlayerComponent'
import LandingPage from './views/landingpage/LandingPage';
import RegisterComponent from './views/registercomponent/RegisterComponent';
import Game from './classes/Game';
import LoginComponent from './views/logonpage/LoginComponent';
import PlayerVsComputer from './views/playervscomputer/PlayerVsComputerView';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/player-vs-player' element={<PlayerVsPlayerComponent />} />

        <Route path='/register' element={<RegisterComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/game' element={<Game />} />
        <Route path="/player-vs-computer" element={<PlayerVsComputer/>} />
      </Routes>
    </Router>
  );
};

export default App;
