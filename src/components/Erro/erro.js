import React from 'react';
import './erro.css';

function Erro({ erro }) {
    return (
        <>
            {erro &&
                <div className="screen">
                    <p className="err">Não foi possível conectar com o servidor. Tente novamente...</p>
                </div>
            }
        </>
    );
}

export default Erro;