import EditArticle from "../EditArticle/EditArticle";
import React from "react";
import {Tab, Tabs,} from "@mui/material";
import Box from "@mui/material/Box";
import {useParams} from "react-router-dom";
import {Title} from "../../stylesheets/Fonts";

const RevisionSelector = () => {
    // Get id from the router
    const {id} = useParams();

    // Stepper logic
    const steps = ['Datum: 16-1-2024, Tijd: 11:10', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11', 'Datum: 16-1-2024, Tijd: 11:11'];
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            {steps.length > 1 &&
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
                    {steps.map((label) => (
                        <Tab key={label} label={label}/>
                    ))}
                </Tabs>
              </>
            }
            {/*Passing revision id to the editarticle*/}
            <EditArticle/>
        </Box>
    );
};
export default RevisionSelector;
