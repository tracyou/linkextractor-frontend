import React, { useState } from "react";
import './ImportXML.css'
import ImportButton from "../components/ImportButton/ImportButton";
const FileUploader = () => {
    const [artikelen, setArtikelen] = React.useState([
        {
            naam: 'Artikel 1',
        },
        {
            naam: 'Artikel 2',
        },
        {
            naam: 'Artikel 3',
        },
    ]);

    return (
        <>

            <div className="importButtonContainer">

                <ImportButton></ImportButton>

            </div>
            <div className="imported-content-container">
                <h1>
                    artieklen
                </h1>
                {/*{file && (*/}
                {/*    <section>*/}

                {/*    </section>*/}
                {/*)}*/}
                <div className="artikelen">
                    {artikelen.map((artikel, index) => (
                            <div key={index} className="artikel">
                            <h2>{artikel.naam}</h2>
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
};

export default FileUploader;