import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to Connect four</h1>
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
  );
};

export default LandingPage;