import '../App.css';
import logo from '../assets/logosvg.svg';


const HeaderComponent: React.FC = () => {

  return (
    <>
      <header className='header'>
        <img src={logo} alt="Logo" className="logo" />
      </header>
    </>
  )
}

export default HeaderComponent;