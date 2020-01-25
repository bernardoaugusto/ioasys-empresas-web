import React from 'react';
import './enterprisesItem.css';

import { useHistory } from "react-router-dom";

function EnterpriseItem({ enterprise }) {

    let history = useHistory();

    function onClickEnterprise() {
        history.push(`/home/enterpriseDetail/${enterprise.id}`)
    }

    return (
        <li className="enterprise-item" onClick={onClickEnterprise}>
            <header>
                <img src={`https://empresas.ioasys.com.br/${enterprise.photo}`} alt="img" />
                <div className="enterprise-info">
                    <strong>{enterprise.enterprise_name}</strong>
                    <p>{enterprise.enterprise_type.enterprise_type_name}</p>
                    <span>{enterprise.country}</span>
                </div>
            </header>
        </li>
    )
}

export default EnterpriseItem;