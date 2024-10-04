// frontend/src/components/Tabs.js
import React, { useState } from 'react';
import Apod from './Apod';
import SatelliteTLE from './SatelliteTLE';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('apod');
    const satelliteIds = ['25544', '40075', '48272']; // Your satellite IDs

    return (
        <div>
            <div className="tab-container">
                <button onClick={() => setActiveTab('apod')}>APOD</button>
                <button onClick={() => setActiveTab('satelliteTLE')}>Satellite TLE</button>
            </div>
            {activeTab === 'apod' && <Apod />}

            {activeTab === 'satelliteTLE' && <SatelliteTLE satellites={satelliteIds} />}            
        </div>
    );
};

export default Tabs;