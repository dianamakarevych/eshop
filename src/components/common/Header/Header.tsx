import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logoImage from '../../../assets/Logo.png';

function Header(): JSX.Element {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const initials = (user && user.username)
    ? user.username
        .split(" ")
        .map((namePart: string) => namePart[0])
        .join("")
        .toUpperCase()
    : "U";

    useEffect(() => {
        const loadUser = () => {
            const loggedInUser = localStorage.getItem("currentUser");
            if (loggedInUser) {
                setUser(JSON.parse(loggedInUser)); 
            } else {
                setUser(null);
            }
        };

        loadUser();

        window.addEventListener("userUpdated", loadUser);

        return () => {
            window.removeEventListener("userUpdated", loadUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser"); 
        setUser(null); 
        navigate("/");
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
                <Link to="/cart" className={styles.cartLink}>Cart</Link>
                {user ? (
                    <>
                        <Link to="profile" style={{textDecoration: "none"}}>{user.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={user.username}
                                className={styles.avatar}
                            />
                            ) : (
                            <div className={styles.avatarPlaceholder}>{initials}</div>
                        )}</Link>
                        <Link to="/profile" className={styles.btnProf}>{user.username}</Link>
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