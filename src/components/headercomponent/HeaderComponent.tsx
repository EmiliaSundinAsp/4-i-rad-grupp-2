import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './HeaderComponet.css';
import logo from '../../assets/logo2.svg';
import { Link } from 'react-router-dom';


const HeaderComponent: React.FC = () => {

  return (
    <>
      <header className='header'>
        <div className='logo-container'>
          <Link to='/'>
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className='login-link'>
          <Link to='/login'>
            <FontAwesomeIcon icon={faUser} size="2x" className='login-icon' />
          </Link>
        </div>
      </header>
    </>
  )
}

export default HeaderComponent;