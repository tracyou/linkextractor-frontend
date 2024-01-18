import EditArticle from "../EditArticle/EditArticle";
import React, {useEffect, useState} from "react";
import {MenuItem, Tab, Tabs,} from "@mui/material";
import Box from "@mui/material/Box";
import {useParams} from "react-router-dom";
import {Title} from "../../stylesheets/Fonts";
import {useQuery} from "@apollo/client";
import {ArticleRevisionFragment, GetLawByIdDocument, GetLawByIdQuery, LawFragment} from "../../graphql/api-schema";

const RevisionSelector = () => {
    // Get id from the router
    const {id} = useParams();
    const [lawId, setLawId] = useState<string | undefined>();
    const [revisionData, setRevisionData] = useState<number | undefined>();
    useEffect(() => {
        setLawId(id);
    }, [id]);
    // Query to get data
    const {
        data: queryResult,
        loading: revisionLoading,
        error: revisionError
    } = useQuery<GetLawByIdQuery>(GetLawByIdDocument, {
        variables: {
            id: lawId
        }
    });

    useEffect(() => {
        if (revisionLoading) {
            return
        }

        if (queryResult) {
            setRevisionData(queryResult.law.revision);
            console.log(queryResult.law.revision)
        }
    }, [revisionLoading]);

    // Setting the data in the

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
              <>
                <h1 style={Title}>Versiebeheer</h1>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                  sx={{
                      '& .MuiTabs-scrollButtons.Mui-disabled': {
                          opacity: 0.3
                      }
                  }}
                >
                    {

                    }
                </Tabs>
              </>
            {/*Passing revision id to the editarticle*/}
            <EditArticle/>
        </Box>
    );
};
export default RevisionSelector;
