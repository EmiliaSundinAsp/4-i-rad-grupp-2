import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent />
      <div className="landing-container">

        
        <div className="button-group">
          <button onClick={() => navigate('/player-vs-player')}>
            Player vs Player
          </button>
          <button onClick={() => navigate('/player-vs-computer')}>
            Player vs Computer
          </button>
          <button onClick={() => navigate('/computer-vs-computer')}>
            Computer vs Computer
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;