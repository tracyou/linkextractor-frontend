import EditArticle from "../EditArticle/EditArticle";
import React from "react";
import {createTheme, Step, StepButton, Stepper} from "@mui/material";
import Box from "@mui/material/Box";
import {useParams} from "react-router-dom";

const RevisionSelector = () => {
    // Get id from the router
    const {id} = useParams();

    // Stepper logic
    const steps = ['Versie: 1, Datum: 16-1-2024, Tijd: 11:10', 'Versie: 2, Datum: 16-1-2024, Tijd: 11:11', 'Versie: 3, Datum: 16-1-2024, Tijd: 11:15'];
    const [activeStep, setActiveStep] = React.useState(0);
    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    return (
        <Box paddingTop={'1.5rem'}>
            {steps.length > 1 &&
              <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => (
                      <Step key={label}>
                          <StepButton color="inherit" onClick={handleStep(index)}>
                              {label}
                          </StepButton>
                      </Step>
                  ))}
              </Stepper>}
            <EditArticle/></Box>
    );
};
export default RevisionSelector;
