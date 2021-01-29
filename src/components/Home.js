import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {

    const history = useHistory();

    const routeToForm = () => {
        history.push('/pizza');
    }

    return (
        <div className='home-container'>
            <div className="header-img">
                <button className='nav-link' onClick={routeToForm}>Pizza?</button>
            </div>
            <p>Food Delivery in Gotham City</p>
            <div className="item-container">
                {/* populate a list of items here */}
            </div>
        </div>
    )
}