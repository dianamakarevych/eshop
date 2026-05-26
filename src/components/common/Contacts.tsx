import React, { useState } from 'react';

const Contacts = () => {
    // 1. Stavy pro hodnoty ve formuláři
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    // 2. Stavy pro zobrazení chyb a úspěchu
    const [errors, setErrors] = useState({ name: false, email: false, msg: false });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Funkce pro odeslání
    const submitContact = (e: React.FormEvent) => {
        e.preventDefault(); // Zabrání znovunačtení stránky

        // Validace (přesně podle tvého zadání)
        const isNameInvalid = !name.trim();
        const isEmailInvalid = !email.includes('@');
        const isMsgInvalid = !msg.trim();

        // Aktualizace chyb do stavu
        setErrors({
            name: isNameInvalid,
            email: isEmailInvalid,
            msg: isMsgInvalid,
        });

        // Pokud je vše v pořádku, schováme formulář a ukážeme success screen
        if (!isNameInvalid && !isEmailInvalid && !isMsgInvalid) {
            setIsSubmitted(true);
        }
    };

    // Funkce pro resetování (vynulování)
    const resetContact = () => {
        setName('');
        setEmail('');
        setMsg('');
        setErrors({ name: false, email: false, msg: false });
        setIsSubmitted(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            {!isSubmitted ? (
                /* FORMULÁŘ */
                <form onSubmit={submitContact} id="contact-form-inner">
                    <div>
                        <label>Jméno:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <span style={{ color: 'red' }}> Jméno je povinné</span>}
                    </div>

                    <div>
                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <span style={{ color: 'red' }}> Email musí obsahovat @</span>}
                    </div>

                    <div>
                        <label>Dotaz:</label>
                        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} />
                        {errors.msg && <span style={{ color: 'red' }}> Zpráva nesmí být prázdná</span>}
                    </div>

                    <button type="submit">Odeslat</button>
                </form>
            ) : (
                /* ÚSPĚŠNÉ ODESLÁNÍ */
                <div id="contact-success">
                    <h3>Děkujeme! Vaše zpráva byla úspěšně odeslána.</h3>
                    <button onClick={resetContact}>Napsat novou zprávu</button>
                </div>
            )}
        </div>
    );
};

export default Contacts;