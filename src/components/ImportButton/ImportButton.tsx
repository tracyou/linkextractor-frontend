import React, { useState } from 'react';
import './ImportButton.css';

type ImportButtonProps = {
    onFileSelect: (file: File) => void;
};

const ImportButton: React.FC<ImportButtonProps> = ({ onFileSelect }) => {

    const [file, setFile] = useState<File>();

    const handleButtonClick = () => {
        const fileInput = document.getElementById('file');
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileChange = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = files![0];
        setFile(selectedFile);
        onFileSelect(selectedFile);
        console.log(selectedFile)
    };

    return (
        <div className="import-button" onClick={handleButtonClick}>
            Import
            <img src={require('./../../imgs/import.png')} alt="Import Icon" />
            <input id="file" type="file" hidden onChange={handleFileChange} />
        </div>
    );
};

export default ImportButton;
