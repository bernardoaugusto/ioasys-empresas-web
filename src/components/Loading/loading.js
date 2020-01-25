import React from 'react';
import './loading.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

function Loading({ load }) {
    return (
        <>
            {load &&
                <div className="screen">
                    <FontAwesomeIcon icon={faCircleNotch} className="icon" spin />
                </div>
            }
        </>
    )
}

export default Loading;