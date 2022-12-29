import React from 'react';
import RingLoader from 'react-spinners/RingLoader';

const Spanner = () => {
    return (
        <div>
            <div className="flex justify-center items-center h-screen ">
                <RingLoader color="#fff"/>
            </div>
        </div>
    );
};

export default Spanner;