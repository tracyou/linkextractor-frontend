import React from 'react';
import './ApiDemo.css';
import '../../views/ImportXML.css'
import {useQuery} from "@apollo/client";
import {MattersDocument, MattersQuery} from "../../graphql/api-schema";

const ApiDemo = () => {

    const {data, loading} = useQuery<MattersQuery>(MattersDocument)

    return (
        <div>
            {
                loading ? <p>Loading...</p> :
                    data?.matters.map(matter =>
                        <pre key={matter.id}>
                            {matter.name}: {matter.color}
                        </pre>)
            }
        </div>
    );
};

export default ApiDemo;
