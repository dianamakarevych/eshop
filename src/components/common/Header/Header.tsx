import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logoImage from '../../../assets/Logo.png';

function Header(): JSX.Element {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("currentUser");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser)); 
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser"); 
        setUser(null); 
        navigate("/login");
    };

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
                
                {user ? (
                    <>
                        <span style={{ marginRight: '15px', fontWeight: 'bold' }}>
                            Hi, {user.username}!
                        </span>
                        <button className={styles.btnDark} onClick={handleLogout}>Log out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.btnDark}>Sign in</Link>
                        <Link to="/register" className={styles.btnDark}>Register</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;