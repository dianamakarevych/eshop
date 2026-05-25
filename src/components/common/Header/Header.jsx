import './Header.css'
import { Link } from 'react-router-dom';
import logoImage from '../../../assets/Logo.png';

function Header(){
    return(
        <header className='header'>
            <div className='headerLeft'>
                <Link to="/" className='logoLink'>
                    <span className='logo'><img src={logoImage} alt="Logo" /></span>
                    <span className='logoName'>Tea shop</span>
                </Link>
            </div>

            <nav className='headerNav'>
                <Link to="/">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contacts">Contacts</Link>
            </nav>

            <div className='headerRight'>
                <Link to="/cart" className="cartLink">Košík</Link>
                    <button className="btnDark">Log in</button>
                    <button className="btnDark">Sign up</button>
            </div>
        </header>
    );
}
export default Header;