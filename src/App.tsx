
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlayerVsPlayerComponent from './views/playervsplayer/PlayerVsPlayerComponent'
import LandingPage from './views/landingpage/LandingPage';
import RegisterComponent from './views/registercomponent/RegisterComponent';
import Game from './classes/Game';
import LoginComponent from './views/loginpage/LoginComponent';
import ProfilePageComponent from './views/profilepage/ProfilePageComponent';
import PlayerVsComputer from './views/playervscomputer/PlayerVsComputerView';
import ComputerVsComputer from './views/computervscomputer/ComputerVsComputerView';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/player-vs-player' element={<PlayerVsPlayerComponent />} />

        <Route path='/register' element={<RegisterComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/profile' element={<ProfilePageComponent />} />
        <Route path='/game' element={<Game />} />
        <Route path="/player-vs-computer" element={<PlayerVsComputer />} />
        <Route path="/computer-vs-computer" element={<ComputerVsComputer/>} />
      </Routes>
    </Router>
  );
};

export default App;
