import React, { useState } from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";
const FileUploader = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        // We will fill this out later
    };

    return (
        <>
            <div className="importButtonContainer">

                <ImportButton></ImportButton>
            </div>
            {/*{file && (*/}
            {/*    <section>*/}

            {/*    </section>*/}
            {/*)}*/}

        </>
    );
};

export default FileUploader;