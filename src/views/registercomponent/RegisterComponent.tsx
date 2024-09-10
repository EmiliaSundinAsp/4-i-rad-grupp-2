import { useState } from "react"
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import './RegisterComponet.css';
import HeaderComponent from "../../components/headercomponent/HeaderComponent";


const RegisterComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = {
      username,
      hashedPassword,
    };

    localStorage.setItem(username, JSON.stringify(user));
    navigate('/login');
  }

  return (
    <>
      <HeaderComponent />
      <div className="register-container">
        <h2>Registrera dig</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="username">Användarnamn:</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password">Lösenord:</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <button className="register-button" type="submit">Registrera</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterComponent;