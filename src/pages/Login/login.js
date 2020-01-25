import React, { useState } from 'react';

import './login.css';
import LoginForm from './LoginForm/loginForm';
import imgIoasys from './../../assets/ioasys.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

function Login() {

    const [loading, setLoading] = useState(false);

    function handleLoad(value) {
        setLoading(value);
    }

    return (
        <>
            {loading &&
                <div id="loading">
                    <FontAwesomeIcon icon={faCircleNotch} className="icon" spin />
                </div>
            }
            <div id="login">
                <img src={imgIoasys} alt="ioasys" />
                <strong>BEM-VINDO AO EMPRESAS</strong>
                <p>Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.</p>
                <LoginForm onSubmit={handleLoad} />
            </div>
        </>
    );
}

export default Login;