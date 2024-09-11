import { useState } from "react"
import { hashSync } from "bcrypt-ts";
import { useNavigate } from "react-router-dom";
import './RegisterComponet.css';
import HeaderComponent from "../../components/headercomponent/HeaderComponent";


const RegisterComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
    }
  };



  return (
    <>
      <HeaderComponent />
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <button className="register-button" type="submit">Register</button>
          </div>
          <div>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterComponent;