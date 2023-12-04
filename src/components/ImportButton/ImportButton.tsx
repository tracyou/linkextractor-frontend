import React from 'react';
import './ImportButton.css';

const ImportButton = () => {
    const handleButtonClick = () => {
        const fileInput = document.getElementById('file') as HTMLInputElement | null;
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div className="import-button" onClick={handleButtonClick}>
            Import
            <img src={require("./../../imgs/import.png")} alt="Import Icon"/>
            <input id="file" type="file" hidden/>
        </div>
    );
};

export default ImportButton;
