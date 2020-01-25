import React, { useState } from 'react';
import api from '../../../services/api';
import './loginForm.css';

import imgEmail from '../../../assets/email.svg';
import imgPassword from '../../../assets/password.svg';
import imgEye from '../../../assets/eye.png';

import { login } from '../../../services/auth';

import { useHistory } from "react-router-dom";


function LoginForm({ onSubmit }) {

    const [typePassword, setTypePassword] = useState('password');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLog, setInvalidLog] = useState(false);
    const [inputClass, setInputClass] = useState('input-block');

    let history = useHistory();

    let invalidLogin;
    let alerta;
    if (invalidLog) {
        invalidLogin = <p className="invalidLogin">Credenciais informadas são invalidas, tente novamente.</p>;
        alerta = <p className="invalidLogin">!</p>;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        onSubmit(true);
        try {
            await api.post('/users/auth/sign_in', { email, password }).then(response => {
                console.log(response);
                login(response.headers['access-token'], response.headers.client, response.headers.uid);
                setInvalidLog(false);
                onSubmit(false);
                history.push("/home");
            });
        } catch {
            onSubmit(false);
            setInputClass('input-block invalid');
            setInvalidLog(true);
        }

    }

    function handleClick() {
        if (typePassword === 'password') {
            setTypePassword('text');
        } else {
            setTypePassword('password');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={inputClass}>
                    <img src={imgEmail} alt="email" />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {alerta}
                </div>
                <div className={inputClass}>
                    <img src={imgPassword} alt="senha" />
                    <input
                        type={typePassword}
                        name="senha"
                        placeholder="Senha"
                        id="senha"
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}

                    />
                    <img src={imgEye} className="eye" alt="eye" onClick={handleClick} />
                    {alerta}
                </div>
                {invalidLogin}
                <button type="submit">
                    ENTRAR
                </button>
            </form>
        </>
    );
}

export default LoginForm;