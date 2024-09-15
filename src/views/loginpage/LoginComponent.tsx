import { useState } from "react"
import HeaderComponent from "../../components/headercomponent/HeaderComponent"
import { Link, useNavigate } from "react-router-dom";
import './LoginComponent.css';


const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {

      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username, password }),
      });

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('userProfileData', JSON.stringify(data));
        navigate('/profile');
      } else {
        setError(data.error || 'An error occurred during login. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  }


  return (
    <>
      <HeaderComponent />
      <div className="login-container">
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="login-username">Username:</label>
            <input type="text" id="login-username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="login-password">Password:</label>
            <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button className="login-button" type="submit">Log in</button>
          </div>
          <div>
            <Link to='/register'>
              <p className="register-here-link">Register here</p>
            </Link>
          </div>
          <div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginComponent;