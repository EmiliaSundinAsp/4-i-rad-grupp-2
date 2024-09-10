import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './HeaderComponet.css';
import logo from '../../assets/logo2.svg';
import { Link } from 'react-router-dom';


const HeaderComponent: React.FC = () => {

  return (
    <>
      <header className='header'>
        <img src={logo} alt="Logo" className="logo" />
        <Link to='/login' className='login-link'>
          <FontAwesomeIcon className='login-icon' icon={faUser} size="2x" />
        </Link>
      </header>
    </>
  )
}

export default HeaderComponent;