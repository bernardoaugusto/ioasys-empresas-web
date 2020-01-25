import React, { useState, useEffect } from 'react';
import './enterpriseDetail.css';
import api from '../../services/api';
import { config } from '../../services/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { useHistory } from "react-router-dom";


import Loading from '../../components/Loading/loading';
import Erro from '../../components/Erro/erro';


function EnterpriseDetail({ match: { params } }) {

    const [enterprise, setEnterprise] = useState({});
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false)

    let history = useHistory();

    function onClickBack() {
        history.push(`/home`)
    }


    useEffect(() => {
        async function loadEnterprise() {
            try {
                await api.get(`/enterprises/${params.id}`, config).then(response => {
                    console.log(response);
                    setEnterprise(response.data.enterprise);
                    setLoading(false);
                });
            } catch {
                setErro(true);
                setLoading(false);
            }
        }

        loadEnterprise();
    }, []);

    return (
        <div className="enterprise-detail">
            <header>
                <div className="back">
                    <FontAwesomeIcon icon={faArrowLeft} className="icon" onClick={onClickBack} />
                </div>
                <p>{enterprise.enterprise_name ? `${enterprise.enterprise_name}` : 'Detalhamento da Empresa'}</p>
            </header>
            <Loading load={loading} />
            <Erro erro={erro} />
            {enterprise.id ?
                <div className="detail">
                    <img src={`https://empresas.ioasys.com.br/${enterprise.photo}`} alt={`E${enterprise.id}`} />
                    <p>{enterprise.description}</p>
                </div> : ''
            }
        </div>
    );
}

export default EnterpriseDetail;