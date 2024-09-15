import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './HeaderComponet.css';
import logo from '../../assets/logo2.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const HeaderComponent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleIconClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }

  return (
    <>
      <header className='header'>
        <div className='logo-container'>
          <Link to='/'>
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className='login-link' onClick={handleIconClick}>
          <FontAwesomeIcon icon={faUser} size="2x" className='login-icon' />
        </div>
      </header>
    </>
  )
}

export default HeaderComponent;