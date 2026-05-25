import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Contacts from '../components/common/Contacts'; // Ověř, zda máš soubor v této složce

const AppRouter = () => {
    return (
        <BrowserRouter>
            {/* JEDNODUCHÉ MENU PRO NAVIGACI */}
            <nav style={{ padding: '10px', background: '#222', marginBottom: '20px' }}>
                <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Hlavní strana</Link>
                <Link to="/contact" style={{ color: 'white' }}>Kontakt</Link>
            </nav>

            <Routes>
                {/* Když jsi na adrese / */}
                <Route path="/" element={<HomePage />} />

                {/* Když jsi na adrese /contact */}
                <Route path="/contact" element={<Contacts />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;