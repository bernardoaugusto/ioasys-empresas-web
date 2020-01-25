import React, { useState } from 'react';
import './home.css'
import api from '../../services/api';
import { config } from '../../services/auth';
import EnterpriseItem from './EnterpriseItem/enterpriseItem';


import ioasys from '../../assets/ioasys-white.png';
import searchImg from '../../assets/search.svg';
import close from '../../assets/close.svg';

import Loading from '../../components/Loading/loading';
import Erro from '../../components/Erro/erro';

function Home() {

    const [searchInative, setsearchInative] = useState(true);
    const [search, setSearch] = useState('');
    const [enterprises, setEnterprises] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('mensagem');
    const [erro, setErro] = useState(false);


    function handleClick() {
        setsearchInative(!searchInative);
    }

    async function getEmpresas(e) {
        if (e.key === 'Enter' || e === 'button') {
            setEnterprises([]);
            setErro(false);
            setLoading(true);
            try {
                await api.get(`/enterprises?name=${search}`, config).then(response => {
                    console.log(response);
                    setEnterprises(response.data.enterprises);
                    setLoading(false);
                    setErro(false);
                    if (response.data.enterprises.length === 0) {
                        setMessage('Nenuma empresa foi encontrada para a busca realizada.')
                    }
                });
            } catch {
                setErro(true);
                setLoading(false);
            }
        }

    }

    return (
        <>
            <div id="home">
                <header>
                    {searchInative ? (
                        <div className="searchLogo">
                            <img src={ioasys} alt="ioasys" className="logo" />
                            <div className="searchIcon">
                                <img src={searchImg} alt="ioasys" onClick={handleClick} className="searchImage" />
                            </div>
                        </div>
                    ) : (
                            <div className="search">
                                <img src={searchImg} alt="ioasys" className="searchImage" onClick={() => getEmpresas('button')} />
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="Pesquisar"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    onKeyPress={getEmpresas}
                                />
                                <img src={close} alt="close" className="close" onClick={handleClick} />
                            </div>
                        )}
                </header>
                {searchInative ? (
                    <div className="content">
                        <p>Clique na busca para iniciar.</p>
                    </div>
                ) : (
                        <div className="main">
                            <Loading load={loading} />
                            <Erro erro={erro} />
                            {message !== 'mensagem' &&
                                <div className="screen">
                                    <p className="message">{message}</p>
                                </div>
                            }
                            <ul>
                                {enterprises.map(enterprise => (
                                    <EnterpriseItem key={enterprise.id} enterprise={enterprise} />
                                ))}
                            </ul>
                        </div>
                    )}
            </div>
        </>
    );
}

export default Home;