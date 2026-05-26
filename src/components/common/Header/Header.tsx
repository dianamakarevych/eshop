import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import logoImage from '../../../assets/Logo.png';

function Header(): JSX.Element {
    return(
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <Link to="/" className={styles.logoLink}>
                    <span className={styles.logo}><img src={logoImage} alt="Logo" /></span>
                    <span className={styles.logoName}>Tea shop</span>
                </Link>
            </div>

            <nav className={styles.headerNav}>
                <Link to="/">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contacts">Contacts</Link>
            </nav>

            <div className={styles.headerRight}>
                <Link to="/cart" className={styles.cartLink}>Košík</Link>
                <Link to="/login" className={styles.btnDark}>Sign in</Link>
                <Link to="/register" className={styles.btnDark}>Register</Link>
            </div>
        </header>
    );
}

export default Header;