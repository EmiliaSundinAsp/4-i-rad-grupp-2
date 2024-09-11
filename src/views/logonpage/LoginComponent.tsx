import { useState } from "react"
import { compareSync } from "bcrypt-ts";
import HeaderComponent from "../../components/headercomponent/HeaderComponent"
import { Link, useNavigate } from "react-router-dom";
import './LoginComponent.css';


const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem(username);

    if (storedUser) {
      const user = JSON.parse(storedUser);

      const passwordMatch = compareSync(password, user.hashedPassword);

      if (passwordMatch) {
        navigate('/');
        console.log('Logged in.');

      } else {
        setError('Incorrect password, please try again.');
      }
    } else {
      setError('Username not found, please try again.');
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
            <input type="text" id="login-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="login-password">Password:</label>
            <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <button className="login-button" type="submit">Log in</button>
          </div>
          <div>
            <Link to='/register'>
              <p className="register-here-link">Register here</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginComponent;