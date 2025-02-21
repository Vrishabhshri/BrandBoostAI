import React from 'react';
import AddCredits from '../../../components/AddCredits'; // Adjusted import path

const AddCreditsPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Buy Credits</h1>
            <AddCredits />
        </div>
    );
};

export default AddCreditsPage; 